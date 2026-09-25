import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../../../redux/features/Payment/paymentSlice";
import { CreditCard, CheckCircle2, Clock, XCircle, ArrowUpRight, Loader2 } from "lucide-react";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const dummyTxns = [
    {
      _id: "TXN-892341",
      bookingId: "BKG-7712",
      amount: 3625,
      date: "2025-08-15",
      status: "Successful",
      method: "UPI (Razorpay)",
    },
    {
      _id: "TXN-541289",
      bookingId: "BKG-3391",
      amount: 2850,
      date: "2025-07-01",
      status: "Successful",
      method: "Credit Card",
    },
  ];

  const list = transactions.length > 0 ? transactions : dummyTxns;

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "successful" || s === "success")
      return (
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <CheckCircle2 size={13} />
          Successful
        </span>
      );
    if (s === "failed")
      return (
        <span className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
          <XCircle size={13} />
          Failed
        </span>
      );
    return (
      <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
        <Clock size={13} />
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
        <p className="text-xs text-gray-500 mt-1">
          View all your transaction history and rental payment receipts
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#2B7FFF]" />
        </div>
      )}

      {!loading && list.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto space-y-3 shadow-xs my-8">
          <CreditCard size={40} className="mx-auto text-gray-400" />
          <h3 className="text-base font-bold text-gray-900">
            No transactions found
          </h3>
          <p className="text-xs text-gray-500">
            You haven't made any payments yet.
          </p>
        </div>
      )}

      {!loading && list.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Booking</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700 font-medium">
                {list.map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-gray-900">
                      {tx._id}
                    </td>
                    <td className="p-4 font-mono text-gray-500">
                      {tx.bookingId || "N/A"}
                    </td>
                    <td className="p-4">{tx.date || tx.createdAt?.substring(0, 10)}</td>
                    <td className="p-4 text-gray-500">{tx.method || "Online"}</td>
                    <td className="p-4 font-bold text-gray-900">₹{tx.amount}</td>
                    <td className="p-4">{getStatusBadge(tx.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
