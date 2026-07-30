from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime, timedelta
from assets.models import Asset, AssetAssignment, AssetHistory
from clearance.models import ClearanceRequest, ClearanceItem
from maintenance.models import MaintenanceTicket

User = get_user_model()

class Command(BaseCommand):
    help = "Seeds the database with KRA SmartAsset AI realistic assets, assignments, tickets, discovery data, and clearance certificates."

    def handle(self, *args, **options):
        self.stdout.write("Clearing database...")
        MaintenanceTicket.objects.all().delete()
        ClearanceItem.objects.all().delete()
        ClearanceRequest.objects.all().delete()
        AssetHistory.objects.all().delete()
        AssetAssignment.objects.all().delete()
        Asset.objects.all().delete()
        User.objects.exclude(is_superuser=True).delete()

        self.stdout.write("Creating KRA Staff & Officers...")
        password = "password123"

        # Administrators / ICT Officers
        john_mwangi = User.objects.create_user(
            username="jmwangi",
            email="john.mwangi@kra.go.ke",
            password=password,
            first_name="John",
            last_name="Mwangi",
            role=User.Role.ADMIN,
            station="Times Tower - Head Office",
            department="ICT Infrastructure"
        )

        jane_wanjiku = User.objects.create_user(
            username="jwanjiku",
            email="jane.wanjiku@kra.go.ke",
            password=password,
            first_name="Jane",
            last_name="Wanjiku",
            role=User.Role.OFFICER,
            station="Times Tower - Head Office",
            department="ICT Hardware & Service Desk"
        )

        # KRA Employees
        abel_mwangi = User.objects.create_user(
            username="amwangi",
            email="abel.mwangi@kra.go.ke",
            password=password,
            first_name="Abel",
            last_name="Mwangi",
            role=User.Role.EMPLOYEE,
            station="Machakos Office",
            department="Domestic Tax Dept"
        )

        mercy_wanjiku = User.objects.create_user(
            username="mwanjiku",
            email="mercy.wanjiku@kra.go.ke",
            password=password,
            first_name="Mercy",
            last_name="Wanjiku",
            role=User.Role.EMPLOYEE,
            station="Mombasa Port",
            department="Customs & Border Control"
        )

        john_kamaus = User.objects.create_user(
            username="jkamau",
            email="john.kamau@kra.go.ke",
            password=password,
            first_name="John",
            last_name="Kamau",
            role=User.Role.EMPLOYEE,
            station="Eldoret Station",
            department="Domestic Tax Dept"
        )

        grace_otieno = User.objects.create_user(
            username="gotieno",
            email="grace.otieno@kra.go.ke",
            password=password,
            first_name="Grace",
            last_name="Otieno",
            role=User.Role.EMPLOYEE,
            station="Kisumu Regional Office",
            department="Human Resources"
        )

        self.stdout.write("Creating KRA Smart Assets & AI Insights...")

        # 1. Abel Mwangi's Laptop (Poster Example: ICT-000451)
        asset_451 = Asset.objects.create(
            asset_tag="ICT-000451",
            category=Asset.Category.LAPTOP,
            brand="Lenovo",
            model_name="ThinkPad T14",
            serial_number="LNV452A890",
            purchase_date=datetime(2023, 5, 10).date(),
            warranty_expiry=datetime(2025, 12, 12).date(),
            station="Machakos Office",
            status=Asset.Status.ASSIGNED,
            condition=Asset.Condition.GOOD,
            ip_address="10.10.25.104",
            mac_address="A4:BB:CC:12:34:56",
            hostname="KRA-LAP-10451",
            os_name="Windows 11 Pro",
            antivirus_status="Active & Updated",
            encryption_status="BitLocker Enabled",
            battery_health_pct=42,
            disk_health_pct=88,
            health_score=82,
            risk_score=3,
            last_seen=timezone.now() - timedelta(hours=2),
            ai_recommendations="Predictive Maintenance: Battery health is 42%. AI Prediction: Battery likely to fail in 45 days. Recommendation: Replace battery during next maintenance cycle."
        )

        # 2. Monitor for Abel (DLM24890)
        asset_monitor = Asset.objects.create(
            asset_tag="ICT-000812",
            category=Asset.Category.MONITOR,
            brand="Dell",
            model_name="UltraSharp 24\"",
            serial_number="DLM24890",
            purchase_date=datetime(2022, 8, 15).date(),
            warranty_expiry=datetime(2025, 8, 15).date(),
            station="Machakos Office",
            status=Asset.Status.ASSIGNED,
            condition=Asset.Condition.EXCELLENT,
            ip_address="10.10.25.105",
            mac_address="A4:BB:CC:12:34:88",
            hostname="KRA-MON-812",
            os_name="N/A (Peripherals)",
            battery_health_pct=100,
            disk_health_pct=100,
            health_score=95,
            risk_score=1,
            last_seen=timezone.now() - timedelta(hours=4),
            ai_recommendations="AI Health Status: System performance normal."
        )

        # 3. Docking Station for Abel (DKS-89910)
        asset_dock = Asset.objects.create(
            asset_tag="ICT-001023",
            category=Asset.Category.OTHER,
            brand="Lenovo",
            model_name="ThinkPad USB-C Dock Gen 2",
            serial_number="DKS-89910",
            purchase_date=datetime(2023, 1, 20).date(),
            station="Machakos Office",
            status=Asset.Status.ASSIGNED,
            condition=Asset.Condition.GOOD,
            ip_address="10.10.25.106",
            mac_address="A4:BB:CC:12:34:99",
            hostname="KRA-DCK-1023",
            os_name="N/A (Dock Firmware v1.4)",
            battery_health_pct=100,
            disk_health_pct=100,
            health_score=92,
            risk_score=1,
            last_seen=timezone.now() - timedelta(hours=1),
            ai_recommendations="AI Health Status: System performance normal."
        )

        # 4. High Risk Asset (Poster Example: Risk Score 8/10)
        asset_high_risk = Asset.objects.create(
            asset_tag="ICT-000104",
            category=Asset.Category.LAPTOP,
            brand="HP",
            model_name="EliteBook 840 G8",
            serial_number="HP840G8-992A",
            purchase_date=datetime(2022, 3, 10).date(),
            warranty_expiry=datetime(2025, 3, 10).date(),
            station="Eldoret Office",
            status=Asset.Status.ASSIGNED,
            condition=Asset.Condition.FAIR,
            ip_address="10.20.12.89",
            mac_address="B8:CC:11:44:99:FF",
            hostname="KRA-LAP-104",
            os_name="Windows 11 Enterprise",
            antivirus_status="Disabled / Stale",
            encryption_status="BitLocker Suspended",
            battery_health_pct=35,
            disk_health_pct=52,
            health_score=38,
            risk_score=8,
            last_seen=timezone.now() - timedelta(days=25),
            ai_recommendations="Risk Alert (8/10): Device inactive for 25 days. IP changed 6 times in 30 days. Antivirus disabled. High theft/misplacement probability."
        )

        # 5. Mercy Wanjiku's Laptop (Pending Clearance Return)
        asset_mercy_lap = Asset.objects.create(
            asset_tag="ICT-000305",
            category=Asset.Category.LAPTOP,
            brand="Dell",
            model_name="Latitude 5430",
            serial_number="DLL5430-8819",
            purchase_date=datetime(2023, 4, 11).date(),
            warranty_expiry=datetime(2026, 4, 11).date(),
            station="Mombasa Port",
            status=Asset.Status.PENDING_RETURN,
            condition=Asset.Condition.GOOD,
            ip_address="192.168.4.55",
            mac_address="CC:88:99:11:22:33",
            hostname="KRA-LAP-305",
            battery_health_pct=85,
            disk_health_pct=92,
            health_score=88,
            risk_score=2,
            last_seen=timezone.now() - timedelta(days=1),
            ai_recommendations="Clearance Return Pending: Awaiting physical ICT scan and verification at Mombasa Port station."
        )

        # 6. Cisco IP Phone (In Stores / Available)
        asset_cisco = Asset.objects.create(
            asset_tag="ICT-000990",
            category=Asset.Category.CISCO_PHONE,
            brand="Cisco",
            model_name="CP-8845 IP Phone",
            serial_number="CSC8845-0012",
            purchase_date=datetime(2024, 1, 15).date(),
            warranty_expiry=datetime(2027, 1, 15).date(),
            station="Times Tower - Head Office",
            status=Asset.Status.AVAILABLE,
            condition=Asset.Condition.EXCELLENT,
            ip_address="10.10.1.40",
            mac_address="00:1E:13:44:55:66",
            hostname="KRA-VOIP-990",
            battery_health_pct=100,
            disk_health_pct=100,
            health_score=98,
            risk_score=1,
            last_seen=timezone.now(),
            ai_recommendations="Available in Store. Ready for immediate staff assignment."
        )

        self.stdout.write("Creating Active Assignments & Audit Logs...")

        # Assign Abel's devices
        for dev in [asset_451, asset_monitor, asset_dock]:
            AssetAssignment.objects.create(
                asset=dev,
                employee=abel_mwangi,
                assigned_date=timezone.now() - timedelta(days=90),
                is_active=True
            )
            AssetHistory.objects.create(
                asset=dev,
                action=AssetHistory.Action.REGISTERED,
                performed_by=john_mwangi,
                notes="Initial KRA Procurement & System Registration",
                timestamp=timezone.now() - timedelta(days=90)
            )
            AssetHistory.objects.create(
                asset=dev,
                action=AssetHistory.Action.ASSIGNED,
                performed_by=jane_wanjiku,
                notes=f"Assigned to Abel Mwangi ({dev.station})",
                timestamp=timezone.now() - timedelta(days=88)
            )

        # Assign High Risk Asset to John Kamau
        AssetAssignment.objects.create(
            asset=asset_high_risk,
            employee=john_kamaus,
            assigned_date=timezone.now() - timedelta(days=120),
            is_active=True
        )

        # Assign Mercy's asset
        AssetAssignment.objects.create(
            asset=asset_mercy_lap,
            employee=mercy_wanjiku,
            assigned_date=timezone.now() - timedelta(days=150),
            is_active=True
        )

        self.stdout.write("Creating Maintenance Tickets...")

        MaintenanceTicket.objects.create(
            asset=asset_451,
            reported_by=abel_mwangi,
            technician=jane_wanjiku,
            issue_description="AI Predictive Alert: Battery capacity dropped to 42%. Thermal throttle during high query load.",
            priority=MaintenanceTicket.Priority.MEDIUM,
            status=MaintenanceTicket.Status.OPEN
        )

        MaintenanceTicket.objects.create(
            asset=asset_high_risk,
            reported_by=john_kamaus,
            technician=jane_wanjiku,
            issue_description="Security Anomaly: Device uncommunicative for 25 days, BitLocker suspended. Audit review required.",
            priority=MaintenanceTicket.Priority.HIGH,
            status=MaintenanceTicket.Status.IN_PROGRESS
        )

        self.stdout.write("Creating Completed & Pending Clearance Workflows...")

        # 1. Fully Cleared Request for Abel Mwangi (Poster Certificate Demo: KRA-ACC-2025-000789)
        cleared_req = ClearanceRequest.objects.create(
            employee=abel_mwangi,
            reason=ClearanceRequest.Reason.TRANSFER,
            status=ClearanceRequest.Status.APPROVED,
            initiated_by=jane_wanjiku,
            created_at=timezone.now() - timedelta(days=5),
            resolved_at=timezone.now() - timedelta(days=1),
            cleared_at=timezone.now() - timedelta(days=1),
            certificate_id="KRA-ACC-2025-000789",
            certificate_hash="A7F904E12C8890B4",
            manager_approved_by=john_mwangi,
            ict_verified_by=jane_wanjiku,
            finance_approved_by=john_mwangi
        )

        ClearanceItem.objects.create(
            clearance_request=cleared_req,
            asset=asset_451,
            status=ClearanceItem.Status.APPROVED,
            condition_on_return=ClearanceItem.Condition.GOOD,
            reviewer_notes="QR Code verified: LNV452A890. Battery scheduled for replacement.",
            reviewed_by=jane_wanjiku,
            reviewed_at=timezone.now() - timedelta(days=1)
        )
        ClearanceItem.objects.create(
            clearance_request=cleared_req,
            asset=asset_monitor,
            status=ClearanceItem.Status.APPROVED,
            condition_on_return=ClearanceItem.Condition.EXCELLENT,
            reviewer_notes="QR Code verified: DLM24890. Display panel spotless.",
            reviewed_by=jane_wanjiku,
            reviewed_at=timezone.now() - timedelta(days=1)
        )
        ClearanceItem.objects.create(
            clearance_request=cleared_req,
            asset=asset_dock,
            status=ClearanceItem.Status.APPROVED,
            condition_on_return=ClearanceItem.Condition.GOOD,
            reviewer_notes="QR Code verified: DKS-89910. All ports functional.",
            reviewed_by=jane_wanjiku,
            reviewed_at=timezone.now() - timedelta(days=1)
        )

        # 2. Pending Clearance Request for Mercy Wanjiku
        mercy_req = ClearanceRequest.objects.create(
            employee=mercy_wanjiku,
            reason=ClearanceRequest.Reason.RESIGNATION,
            status=ClearanceRequest.Status.PENDING,
            initiated_by=jane_wanjiku,
            created_at=timezone.now() - timedelta(days=3)
        )
        ClearanceItem.objects.create(
            clearance_request=mercy_req,
            asset=asset_mercy_lap,
            status=ClearanceItem.Status.PENDING,
            reviewer_notes="Awaiting physical ICT QR scan return at Mombasa station."
        )

        self.stdout.write("Database successfully seeded with KRA SmartAsset AI data!")
