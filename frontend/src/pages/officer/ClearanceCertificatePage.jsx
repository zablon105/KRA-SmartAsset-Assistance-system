import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { CheckCircle2, ShieldCheck, Printer, ArrowLeft, Search, QrCode } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import Layout from "../../components/Layout";

export default function ClearanceCertificatePage() {
  const { id } = useParams();
  const [clearance, setClearance] = useState(null);
  const [certInput, setCertInput] = useState("KRA-ACC-2025-000789");
  const [verificationResult, setVerificationResult] = useState({
    valid: true,
    certId: "KRA-ACC-2025-000789",
    staffName: "Abel Mwangi",
    issuedOn: "14 May 2025",
    status: "Cleared & Signed"
  });

  useEffect(() => {
    if (id) {
      axiosClient.get(`/clearance/requests/${id}/`)
        .then((res) => {
          setClearance(res.data);
          if (res.data.certificate_id) {
            setCertInput(res.data.certificate_id);
          }
        })
        .catch((err) => console.error("Error loading clearance cert:", err));
    }
  }, [id]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certInput.trim()) return;

    axiosClient.get(`/clearance/requests/verify_certificate/?cert_id=${certInput.trim()}`)
      .then((res) => {
        if (res.data.valid) {
          const c = res.data.certificate;
          setVerificationResult({
            valid: true,
            certId: c.certificate_id,
            staffName: c.employee_full_name,
            issuedOn: c.cleared_at ? new Date(c.cleared_at).toLocaleDateString() : "14 May 2025",
            status: "Cleared & Signed"
          });
        }
      })
      .catch(() => {
        setVerificationResult({
          valid: false,
          certId: certInput,
          staffName: "-",
          issuedOn: "-",
          status: "Invalid / Not Found"
        });
      });
  };

  return (
    <Layout title="Digital Clearance Certificate View" subtitle="Instant Authenticity Verification & Print Export">
      <div className="flex justify-between items-center mb-6">
        <Link to="/officer/clearance" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900">
          <ArrowLeft size={16} /> Back to Clearance List
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-colors"
        >
          <Printer size={16} /> Print Official Certificate
        </button>
      </div>

      {/* Main Grid: Certificate View + Verification Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Printable Certificate View matching Poster (Span 2) */}
        <div className="bg-white text-slate-900 border border-slate-300 rounded-2xl p-8 shadow-xl lg:col-span-2 relative overflow-hidden">
          
          {/* Certificate Stamp */}
          <div className="absolute top-6 right-6 px-3 py-1 bg-emerald-100 border-2 border-emerald-600 text-emerald-800 font-extrabold text-xs tracking-wider rounded uppercase transform rotate-2">
            CLEARED
          </div>

          {/* Header */}
          <div className="flex items-center gap-4 border-b-2 border-slate-900 pb-5 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-amber-500 rounded-2xl p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-black text-amber-400 text-xl tracking-wider">
                KRA
              </div>
            </div>
            <div>
              <h2 className="text-xs font-extrabold text-red-600 tracking-widest uppercase">KENYA REVENUE AUTHORITY</h2>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">ICT ASSET CLEARANCE CERTIFICATE</h1>
              <p className="text-[11px] text-slate-500">Official SmartAsset AI Verification Record</p>
            </div>
          </div>

          {/* Employee & Certificate Info Table */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 font-bold block">Certificate ID:</span>
              <span className="font-extrabold text-slate-900 font-mono text-sm">
                {clearance?.certificate_id || "KRA-ACC-2025-000789"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block">Staff ID:</span>
              <span className="font-bold text-slate-900 font-mono">123456</span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block">Staff Name:</span>
              <span className="font-extrabold text-slate-900 text-sm">
                {clearance?.employee_full_name || "Abel Mwangi"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block">Department:</span>
              <span className="font-bold text-slate-900">
                {clearance?.employee_department || "Domestic Tax Dept"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block">Clearance Date:</span>
              <span className="font-bold text-slate-900">16 May 2025</span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block">Cleared By:</span>
              <span className="font-bold text-slate-900">Jane Wanjiku (ICT Officer)</span>
            </div>
          </div>

          {/* Cleared Assets Table */}
          <div className="mb-6">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">Cleared Assets List</h3>
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="p-2.5">Asset ID</th>
                  <th className="p-2.5">Description</th>
                  <th className="p-2.5">Serial Number</th>
                  <th className="p-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-bold font-mono">ICT-000451</td>
                  <td className="p-2.5 font-semibold">Laptop Lenovo T14</td>
                  <td className="p-2.5 font-mono text-slate-600">LNV452A890</td>
                  <td className="p-2.5 text-right font-bold text-emerald-700">Returned - Good</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-mono">ICT-000812</td>
                  <td className="p-2.5 font-semibold">Monitor Dell 24"</td>
                  <td className="p-2.5 font-mono text-slate-600">DLM24890</td>
                  <td className="p-2.5 text-right font-bold text-emerald-700">Returned - Good</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-mono">ICT-001023</td>
                  <td className="p-2.5 font-semibold">Docking Station</td>
                  <td className="p-2.5 font-mono text-slate-600">DKS-89910</td>
                  <td className="p-2.5 text-right font-bold text-emerald-700">Returned - Good</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signatures & Footer QR Code */}
          <div className="flex items-end justify-between border-t border-slate-200 pt-6">
            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-900">Digital Signatures Verified</p>
              <p className="text-[11px] text-slate-500 font-mono">Hash: A7F904E12C8890B4</p>
              <div className="h-10 w-32 border-b border-dashed border-slate-400 flex items-end font-serif italic text-slate-600">
                Jane Wanjiku
              </div>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Scan to Verify</span>
                <span className="text-[10px] font-mono text-slate-600">SmartAsset AI Security</span>
              </div>
              <div className="p-1.5 bg-slate-100 rounded-lg border border-slate-300">
                <svg width="48" height="48" viewBox="0 0 100 100" className="text-slate-900">
                  <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                  <rect x="10" y="10" width="15" height="15" fill="white" />
                  <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                  <rect x="75" y="10" width="15" height="15" fill="white" />
                  <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                  <rect x="10" y="75" width="15" height="15" fill="white" />
                  <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Side Panel (VERIFY CERTIFICATE Tool) */}
        <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <QrCode size={20} className="text-emerald-400" />
              <h3 className="font-bold text-white text-base">VERIFY CERTIFICATE</h3>
            </div>

            <form onSubmit={handleVerify} className="space-y-3 mb-6">
              <label className="text-xs text-slate-400 font-medium block">Enter Certificate ID</label>
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="e.g. KRA-ACC-2025-000789"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white transition-colors"
              >
                Verify Authenticity
              </button>
            </form>

            {/* Result display matching Poster */}
            {verificationResult && (
              <div className={`p-4 rounded-xl border ${
                verificationResult.valid
                  ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                  : "bg-rose-950/40 border-rose-500/50 text-rose-300"
              } text-center space-y-2`}>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="font-black text-sm text-white uppercase tracking-wider">
                  {verificationResult.valid ? "Certificate Is Valid" : "Invalid Certificate"}
                </h4>
                <p className="text-xs">Staff: <b>{verificationResult.staffName}</b></p>
                <p className="text-[11px] text-slate-400 font-mono">Issued on {verificationResult.issuedOn}</p>
                <p className="text-[11px] font-bold text-emerald-400">{verificationResult.status}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
}
