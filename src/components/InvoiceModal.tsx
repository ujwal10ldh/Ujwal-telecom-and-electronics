import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Store, 
  Building2, 
  FileText,
  PhoneCall,
  Mail,
  MapPin
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { Order } from '../types';

interface InvoiceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, isOpen, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  // Calculate GST components (assuming inclusive standard 18% GST on electronics)
  // Taxable Value = Total / 1.18
  const totalAmount = order.total;
  const taxableValue = Math.round((totalAmount / 1.18) * 100) / 100;
  const totalGst = Math.round((totalAmount - taxableValue) * 100) / 100;
  const cgst = Math.round((totalGst / 2) * 100) / 100;
  const sgst = Math.round((totalGst / 2) * 100) / 100;

  // Convert numbers to words (simple Indian currency phrasing)
  const numberToWords = (num: number): string => {
    const a = [
      '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ',
      'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWords = (n: number): string => {
      let str = '';
      if (n > 99) {
        str += a[Math.floor(n / 100)] + 'Hundred ';
        n %= 100;
      }
      if (n > 19) {
        str += b[Math.floor(n / 10)] + ' ' + a[n % 10];
      } else {
        str += a[n];
      }
      return str;
    };

    if (num === 0) return 'Zero Rupees Only';
    let output = '';
    const crore = Math.floor(num / 10000000);
    num %= 10000000;
    const lakh = Math.floor(num / 100000);
    num %= 100000;
    const thousand = Math.floor(num / 1000);
    num %= 1000;
    const remaining = num;

    if (crore > 0) output += inWords(crore) + 'Crore ';
    if (lakh > 0) output += inWords(lakh) + 'Lakh ';
    if (thousand > 0) output += inWords(thousand) + 'Thousand ';
    if (remaining > 0) output += inWords(remaining);

    return output.trim() + ' Rupees Only';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Action Header - Hidden during print */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Official Tax Invoice / Bill of Supply</h3>
              <p className="text-[11px] text-slate-500">GST Compliance Invoice #{order.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div ref={printRef} className="p-6 sm:p-8 text-slate-900 text-xs space-y-6 print:p-8 print:text-black">
          
          {/* Header & Store Branding */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-emerald-900 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Store className="w-6 h-6 text-emerald-900" />
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-display">
                  {STORE_INFO.name.toUpperCase()}
                </h1>
              </div>
              <p className="text-xs font-bold text-emerald-900 mt-0.5">
                Authorized Electronics, Smartphones & Accessories Retailer
              </p>
              <div className="text-[11px] text-slate-600 mt-1.5 space-y-0.5 leading-relaxed">
                <p>{STORE_INFO.address}, {STORE_INFO.cityStatePincode}</p>
                <p>Phone: {STORE_INFO.phoneDisplay} · WhatsApp: +91 {STORE_INFO.whatsapp}</p>
                <p>Email: contact@ujwaltelecom.in · Web: ujwaltelecom.in</p>
              </div>
            </div>

            <div className="sm:text-right bg-slate-50 print:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200 w-full sm:w-auto">
              <span className="inline-block px-2.5 py-1 bg-emerald-950 text-white text-[10px] font-bold rounded uppercase tracking-wider mb-2 print:border print:border-black print:text-black print:bg-transparent">
                TAX INVOICE
              </span>
              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-slate-500 font-medium">Invoice No: </span>
                  <strong className="font-mono text-slate-950">INV-{order.id}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Date: </span>
                  <strong className="text-slate-950">{order.date}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">GSTIN: </span>
                  <strong className="font-mono text-slate-950">03AABCU9803L1Z4</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">State Code: </span>
                  <strong className="text-slate-950">03 (Punjab)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Billed To / Shipped To Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 print:bg-transparent print:border-slate-300">
            <div>
              <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block mb-1">
                Billed To & Recipient Details:
              </span>
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-sm text-slate-950">{order.shippingAddress.fullName}</p>
                <p className="text-slate-700">Phone: <strong>{order.shippingAddress.phone}</strong></p>
                {order.shippingAddress.email && (
                  <p className="text-slate-700">Email: {order.shippingAddress.email}</p>
                )}
                <p className="text-slate-700 pt-1 leading-relaxed">
                  {order.shippingAddress.streetAddress}
                  {order.shippingAddress.areaLocality && `, ${order.shippingAddress.areaLocality}`}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block mb-1">
                Shipment & Fulfillment:
              </span>
              <div className="text-xs space-y-1">
                <div>
                  <span className="text-slate-500">Delivery Mode: </span>
                  <strong className="text-slate-900">
                    {order.shippingAddress.deliveryType === 'store_pickup'
                      ? 'In-Store Collection (Lohara Counter)'
                      : 'Doorstep Local Delivery'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500">Tracking Code: </span>
                  <strong className="font-mono text-emerald-950">{order.trackingNumber || 'UJWAL-LOCAL-01'}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Payment Method: </span>
                  <strong className="text-slate-900">{order.paymentMethod}</strong>
                  <span className="ml-1 text-[11px] font-bold text-emerald-800">({order.paymentStatus})</span>
                </div>
                {order.upiTransactionId && (
                  <div>
                    <span className="text-slate-500">UPI Ref / UTR: </span>
                    <strong className="font-mono text-slate-800">{order.upiTransactionId}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Itemized Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-900 text-[11px] uppercase tracking-wider border-b border-slate-300">
                  <th className="p-2.5 border-r border-slate-200 w-10 text-center">#</th>
                  <th className="p-2.5 border-r border-slate-200">Item Description</th>
                  <th className="p-2.5 border-r border-slate-200 w-24 text-center">HSN/SAC</th>
                  <th className="p-2.5 border-r border-slate-200 w-16 text-center">Qty</th>
                  <th className="p-2.5 border-r border-slate-200 w-24 text-right">Unit Price</th>
                  <th className="p-2.5 w-28 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-2.5 border-r border-slate-200 text-center font-mono text-slate-500">
                      {idx + 1}
                    </td>
                    <td className="p-2.5 border-r border-slate-200">
                      <div className="font-bold text-slate-900">{item.product.name}</div>
                      <div className="text-[10px] text-slate-500">
                        Brand: {item.product.brand} · Category: {item.product.category.toUpperCase()} · 100% Genuine Brand Unit
                      </div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-center font-mono text-slate-600 text-[11px]">
                      {item.product.category === 'smartphones' ? '8517 12 00' : '8518 30 00'}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-center font-bold">
                      {item.quantity}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-right font-mono tabular-nums">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right font-bold font-mono tabular-nums text-slate-950">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Tax Calculation Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
            <div className="flex-1 space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 leading-relaxed print:bg-transparent">
                <span className="font-bold text-slate-800 block text-[11px] mb-1">
                  Amount Chargeable (in words):
                </span>
                <span className="font-semibold text-emerald-950 italic">
                  {numberToWords(order.total)}
                </span>
              </div>

              <div className="text-[10px] text-slate-500 space-y-0.5 pt-2">
                <p>• Official Tax Invoice issued under Section 31 of CGST Act, 2017.</p>
                <p>• Goods are warranted by respective brand manufacturers across India.</p>
                <p>• For repair or warranty service, carry this original invoice.</p>
              </div>
            </div>

            <div className="w-full sm:w-72 space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                <span>Subtotal (MRP Gross):</span>
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  ₹{order.subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-200 text-emerald-700">
                  <span>Store Discount / Coupon:</span>
                  <span className="font-mono tabular-nums font-semibold">
                    -₹{order.discount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                <span>Delivery / Shipping Charge:</span>
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                <span>Taxable Value:</span>
                <span className="font-mono tabular-nums text-slate-800">
                  ₹{taxableValue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between py-1 text-slate-600 text-[11px]">
                <span>CGST (9%):</span>
                <span className="font-mono tabular-nums">₹{cgst.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600 text-[11px]">
                <span>SGST (9%):</span>
                <span className="font-mono tabular-nums">₹{sgst.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between py-2 border-t-2 border-slate-950 text-sm font-bold text-slate-950">
                <span>Invoice Total:</span>
                <span className="font-mono tabular-nums text-base text-emerald-950">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Footer & Signature */}
          <div className="pt-8 border-t border-slate-300 flex flex-col sm:flex-row items-end justify-between gap-4">
            <div className="text-[10px] text-slate-500 leading-normal">
              <p className="font-bold text-slate-700">UJWAL TELECOM & ELECTRONICS</p>
              <p>Maha Luxmi Nagar, Lohara, Ludhiana - 141016 (Punjab)</p>
              <p>Support Hotline: +91 98036 79285</p>
            </div>

            <div className="text-center sm:text-right w-52 space-y-6">
              <p className="text-[11px] font-bold text-slate-900">
                For Ujwal Telecom & Electronics
              </p>
              <div className="border-b border-slate-400 pt-8" />
              <p className="text-[10px] text-slate-500">
                Authorized Signatory
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
