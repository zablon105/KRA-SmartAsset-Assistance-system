import { useState } from "react";
import { useNavigate } from "react-router";
import { createAsset } from "../../api/assetApi";
import { CATEGORY_CHOICES } from "../../utils/assetChoices";
import { HardDrive, Calendar, MapPin, Upload, HelpCircle, QrCode } from "lucide-react";
import Layout from "../../components/Layout";

const EMPTY_FORM = {
  asset_tag: "",
  category: "",
  brand: "",
  model_name: "",
  serial_number: "",
  purchase_date: "",
  warranty_expiry: "",
  station: "",
  condition: "excellent",
  processor: "",
  ram: "",
  storage: "",
};

export default function RegisterAssetPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      // Send empty optional dates as null rather than "", which DRF's DateField rejects
      const payload = {
        ...form,
        purchase_date: form.purchase_date || null,
        warranty_expiry: form.warranty_expiry || null,
      };
      await createAsset(payload);
      navigate("/officer/assets");
    } catch (err) {
      setErrors(err.response?.data || { detail: "Could not save asset." });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";
  const labelClass = "block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5";
  const errorClass = "text-tertiary text-xs mt-1";

  return (
    <Layout title="Register New Asset" subtitle="Add a device to the ICT registry.">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Form Cards (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Hardware Specifications */}
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <HardDrive size={16} />
              </span>
              <div>
                <h3 className="text-sm font-bold dark:text-white">Hardware Specifications</h3>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">Primary technical details and identifiers for the equipment.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Device Category</label>
                <select
                  name="category" value={form.category} onChange={handleChange}
                  className={inputClass} required
                >
                  <option value="">Select Category</option>
                  {CATEGORY_CHOICES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                {errors.category && <p className={errorClass}>{errors.category[0]}</p>}
              </div>

              <div>
                <label className={labelClass}>Brand / Manufacturer</label>
                <input
                  name="brand" value={form.brand} onChange={handleChange}
                  placeholder="e.g. Dell, HP, Apple" className={inputClass} required
                />
                {errors.brand && <p className={errorClass}>{errors.brand[0]}</p>}
              </div>

              <div>
                <label className={labelClass}>Model Name/Number</label>
                <input
                  name="model_name" value={form.model_name} onChange={handleChange}
                  placeholder="e.g. Latitude 5420" className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Serial Number (S/N)</label>
                <input
                  name="serial_number" value={form.serial_number} onChange={handleChange}
                  placeholder="Unique manufacturer ID" className={inputClass} required
                />
                {errors.serial_number && <p className={errorClass}>{errors.serial_number[0]}</p>}
              </div>

              <div>
                <label className={labelClass}>Processor (CPU)</label>
                <input
                  name="processor" value={form.processor} onChange={handleChange}
                  placeholder="e.g. Intel Core i7 / Apple M3" className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>RAM</label>
                  <input
                    name="ram" value={form.ram} onChange={handleChange}
                    placeholder="e.g. 16GB" className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Storage</label>
                  <input
                    name="storage" value={form.storage} onChange={handleChange}
                    placeholder="e.g. 512GB SSD" className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Procurement & Asset ID */}
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <Calendar size={16} />
              </span>
              <div>
                <h3 className="text-sm font-bold dark:text-white">Procurement & Asset ID</h3>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">Financial tracking and internal identification details.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Purchase Date</label>
                <input
                  type="date" name="purchase_date" value={form.purchase_date}
                  onChange={handleChange} className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Warranty Expiry</label>
                <input
                  type="date" name="warranty_expiry" value={form.warranty_expiry}
                  onChange={handleChange} className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Internal Asset Number</label>
                <input
                  name="asset_tag" value={form.asset_tag} onChange={handleChange}
                  placeholder="ICT-2026-XXXX" className={inputClass} required
                />
                {errors.asset_tag && <p className={errorClass}>{errors.asset_tag[0]}</p>}
              </div>
            </div>
          </div>

          {/* Card 3: Deployment & Logistics */}
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                <MapPin size={16} />
              </span>
              <div>
                <h3 className="text-sm font-bold dark:text-white">Deployment & Logistics</h3>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">Define the initial physical and operational status.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Initial Condition</label>
                <div className="flex gap-4 items-center h-9">
                  {["excellent", "good", "fair", "poor"].map((c) => (
                    <label key={c} className="flex items-center gap-1.5 text-xs cursor-pointer capitalize">
                      <input
                        type="radio" name="condition" value={c}
                        checked={form.condition === c} onChange={handleChange}
                        className="text-primary focus:ring-primary"
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Assigned Station / Department</label>
                <input
                  name="station" value={form.station} onChange={handleChange}
                  placeholder="e.g. IT Warehouse, Block A - Room 10" className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end">
            <button
              type="button" onClick={() => navigate("/officer/assets")}
              className="text-xs font-bold text-gray-500 border border-gray-200 dark:border-neutral-800 rounded-lg px-6 py-2.5 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit" disabled={submitting}
              className="bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-lg px-6 py-2.5 shadow-md disabled:opacity-50 transition-colors"
            >
              {submitting ? "Registering..." : "Save Asset"}
            </button>
          </div>

        </div>

        {/* Right Column: Informational Sidebar Cards */}
        <div className="space-y-6 text-left">
          
          {/* Asset QR Identity Card */}
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Asset QR Identity</span>
            <div className="w-28 h-28 bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-200 dark:border-neutral-800 rounded-xl flex flex-col items-center justify-center text-gray-300 dark:text-neutral-700">
              <QrCode size={40} />
              <span className="text-[8px] text-gray-400 mt-2">QR Code will be generated upon saving</span>
            </div>
            
            <div className="flex gap-2 w-full mt-4">
              <button disabled className="flex-1 text-[9px] font-bold text-gray-400 border border-gray-150 dark:border-neutral-800 rounded-lg py-1.5 opacity-50">
                Download
              </button>
              <button disabled className="flex-1 text-[9px] font-bold text-gray-400 border border-gray-150 dark:border-neutral-800 rounded-lg py-1.5 opacity-50">
                Print Label
              </button>
            </div>
          </div>

          {/* Equipment Image Card */}
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm text-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Equipment Image</span>
            
            <div className="w-full h-32 border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-xl flex flex-col items-center justify-center hover:bg-gray-50/50 dark:hover:bg-neutral-900/50 cursor-pointer transition-colors p-4">
              <Upload size={24} className="text-gray-400 mb-2" />
              <span className="text-[10px] font-bold text-gray-800 dark:text-gray-300">Upload asset photo</span>
              <span className="text-[8px] text-gray-400 mt-1">Max size 2MB (JPG, PNG)</span>
            </div>
          </div>

          {/* Registration Guidelines */}
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-primary" />
              <h4 className="text-xs font-bold dark:text-white">Registration Guidelines</h4>
            </div>
            
            <ul className="list-disc list-inside space-y-2 text-[10px] text-gray-500 dark:text-gray-400 pl-1 leading-relaxed">
              <li>Ensure the serial number matches the sticker on the physical device.</li>
              <li>Asset Number is auto-generated based on the current year and inventory sequence.</li>
              <li>Initial station should be where the asset is currently located, even if in transit.</li>
            </ul>
          </div>

        </div>

      </form>
    </Layout>
  );
}