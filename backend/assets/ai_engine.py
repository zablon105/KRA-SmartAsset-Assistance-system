from datetime import date, timedelta
from django.utils import timezone

def calculate_asset_ai_insights(asset):
    """
    Evaluates battery health, disk health, activity logs, and network metrics
    to compute dynamic Risk Score (1-10), Health Score (0-100), AI Predictions,
    and Anomaly / Fraud Alerts.
    """
    insights = []
    risk_score = 1
    health_score = 95

    # 1. Predictive Maintenance: Battery & Disk Health
    if asset.category == "laptop":
        if asset.battery_health_pct < 50:
            health_score -= 25
            risk_score += 2
            est_days = max(10, int(asset.battery_health_pct * 1.1))
            insights.append(
                f"Predictive Maintenance: Battery health at {asset.battery_health_pct}%. Likely to fail in ~{est_days} days. Recommendation: Replace battery during next maintenance cycle."
            )
        elif asset.battery_health_pct < 75:
            health_score -= 10
            insights.append(f"Battery health degrading ({asset.battery_health_pct}%). Monitor during routine checks.")

    if asset.disk_health_pct < 60:
        health_score -= 20
        risk_score += 2
        insights.append(
            f"Hardware Warning: Storage disk health at {asset.disk_health_pct}%. High risk of sector failure. Backup data immediately."
        )

    # 2. Warranty Expiry Evaluation
    if asset.warranty_expiry:
        today = date.today()
        days_until_warranty = (asset.warranty_expiry - today).days
        if days_until_warranty < 0:
            risk_score += 1
            insights.append(f"Warranty Expiry: Warranty expired on {asset.warranty_expiry}. Consider service plan renewal.")
        elif days_until_warranty <= 45:
            insights.append(f"Warranty Expiry: Warranty expires in {days_until_warranty} days ({asset.warranty_expiry}). Plan for renewal.")

    # 3. Network Discovery & Anomaly / Fraud Detection
    if asset.last_seen:
        days_inactive = (timezone.now() - asset.last_seen).days
        if days_inactive > 21:
            risk_score += 3
            health_score -= 15
            insights.append(
                f"Risk Alert: Device offline for {days_inactive} days. High probability of being misplaced, stolen, or unmonitored."
            )

    # 4. Status Check
    if asset.status == "under_repair":
        health_score -= 30
        risk_score += 2
        insights.append("Asset actively undergoing repair ticket servicing.")
    elif asset.status == "pending_return":
        risk_score += 2
        insights.append("Clearance Return Pending: Asset awaiting physical ICT scan and verification.")

    # Ensure bounds
    risk_score = max(1, min(10, risk_score))
    health_score = max(10, min(100, health_score))

    if not insights:
        insights.append("AI Health Status: System performance normal. Device operating within optimal parameters.")

    return {
        "health_score": health_score,
        "risk_score": risk_score,
        "ai_recommendations": "\n\n".join(insights)
    }
