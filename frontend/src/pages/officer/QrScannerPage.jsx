import { QrCode, Camera } from "lucide-react";
import Layout from "../../components/Layout";

export default function QrScannerPage() {
  return (
    <Layout title="QR Asset Scanner" subtitle="Scan device barcode / QR stickers to verify asset registration & ownership">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-xs max-w-lg mx-auto text-center">
        <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
          <QrCode size={40} />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Optical Scanner Ready</h3>
        <p className="text-xs text-slate-500 mb-6">Position the physical KRA Asset Tag QR Code within the scanner frame.</p>

        <div className="bg-slate-900 text-white rounded-xl p-8 flex flex-col items-center justify-center h-56 border-2 border-dashed border-emerald-500/50 mb-6 relative overflow-hidden">
          <div className="w-40 h-40 border-2 border-emerald-400 rounded-lg flex items-center justify-center relative animate-pulse">
            <Camera size={32} className="text-emerald-400 opacity-60" />
            <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-400 shadow-md animate-bounce"></div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 mt-4">Camera Active - Scanning...</span>
        </div>

        <button className="w-full py-2.5 bg-[#007a3d] hover:bg-[#005c2b] text-white font-semibold text-xs rounded-lg shadow-md">
          Simulate Test Tag Scan (ICT-000245)
        </button>
      </div>
    </Layout>
  );
}
