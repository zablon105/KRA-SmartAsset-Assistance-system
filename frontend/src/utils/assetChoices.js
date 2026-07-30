// Mirrors Asset.Category choices in backend/assets/models.py.
// Keep in sync if the backend enum changes.
export const CATEGORY_CHOICES = [
  { value: "laptop", label: "Laptop" },
  { value: "mini_desktop", label: "Mini Desktop" },
  { value: "cisco_phone", label: "Cisco IP Phone" },
  { value: "monitor", label: "Monitor" },
  { value: "mifi", label: "MiFi" },
  { value: "vpn_token", label: "VPN Token" },
  { value: "keyboard", label: "Keyboard" },
  { value: "mouse", label: "Mouse" },
  { value: "other", label: "Other ICT Equipment" },
];

export const STATUS_CHOICES = [
  { value: "available", label: "Available" },
  { value: "assigned", label: "Assigned" },
  { value: "under_repair", label: "Under Repair" },
  { value: "pending_return", label: "Pending Return" },
  { value: "disposed", label: "Disposed" },
];

export const CONDITION_CHOICES = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
];