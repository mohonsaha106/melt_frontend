import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CustomerInquiry } from '../../types/admin';
import { 
  MessageSquare, 
  Search, 
  Phone, 
  Mail, 
  Trash2, 
  Plus, 
  X, 
  MessageCircle 
} from 'lucide-react';
import { CustomSelect } from '../ui/CustomSelect';

export const AdminInquiries: React.FC = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry, addInquiry } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Inquiry Form State
  const [newInq, setNewInq] = useState({
    customerName: '',
    phone: '',
    email: '',
    topic: 'বিয়ের ফুল ও মালা সংরক্ষণ',
    message: '',
    status: 'New' as CustomerInquiry['status']
  });

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      const matchesStatus = selectedStatus === 'All' || inq.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        q === '' ||
        inq.customerName.toLowerCase().includes(q) ||
        inq.phone.includes(q) ||
        inq.topic.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, selectedStatus, searchQuery]);

  const handleCreateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInq.customerName.trim() || !newInq.phone.trim()) return;

    addInquiry(newInq);
    setNewInq({
      customerName: '',
      phone: '',
      email: '',
      topic: 'বিয়ের ফুল ও মালা সংরক্ষণ',
      message: '',
      status: 'New'
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-white tracking-tight">
            Customer Inquiries & Flower Preservation Requests
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Incoming custom inquiries from the contact forms, corporate orders, and wedding garland consultations.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-1.5 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log Phone/Walk-in Inquiry</span>
        </button>
      </div>

      {/* Search & Filter Strip */}
      <div className="bg-[#161616] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries by customer name, phone number, subject..."
            className="w-full bg-zinc-900 border border-zinc-750 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {['All', 'New', 'Contacted', 'Completed'].map(status => {
            const isSelected = selectedStatus === status;
            const count = status === 'All'
              ? inquiries.length
              : inquiries.filter(i => i.status === status).length;

            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`
                  px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5
                  ${isSelected
                    ? 'bg-emerald-400 text-black shadow-sm font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }
                `}
              >
                <span>{status}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black text-emerald-300' : 'bg-zinc-800 text-zinc-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map(inq => (
            <div 
              key={inq.id}
              className="bg-[#161616] border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-sm space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Name & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">{inq.customerName}</h3>
                    <div className="text-[10px] font-mono text-zinc-500 mt-0.5">{inq.createdAt}</div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    inq.status === 'New'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : inq.status === 'Contacted'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}>
                    {inq.status}
                  </span>
                </div>

                {/* Topic */}
                <div className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300 text-xs font-semibold">
                  {inq.topic}
                </div>

                {/* Message Body */}
                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/60">
                  "{inq.message}"
                </p>

                {/* Contact Coordinates */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <Phone className="w-3.5 h-3.5 text-zinc-500" />
                    <a href={`tel:${inq.phone}`} className="hover:underline font-semibold">
                      {inq.phone}
                    </a>
                  </div>

                  {inq.email && (
                    <div className="flex items-center space-x-2 text-zinc-400">
                      <Mail className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{inq.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-1.5">
                  <a
                    href={`https://wa.me/880${inq.phone.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-1 transition-colors"
                    title="Open WhatsApp Chat"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${inq.phone}`}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-xs font-semibold flex items-center space-x-1 transition-colors"
                    title="Call Phone"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center space-x-1.5">
                  {inq.status === 'New' && (
                    <button
                      onClick={() => updateInquiryStatus(inq.id, 'Contacted')}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-semibold cursor-pointer"
                    >
                      Mark Contacted
                    </button>
                  )}

                  {inq.status === 'Contacted' && (
                    <button
                      onClick={() => updateInquiryStatus(inq.id, 'Completed')}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-300 text-xs font-semibold cursor-pointer"
                    >
                      Done
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (confirm(`Delete inquiry from ${inq.customerName}?`)) {
                        deleteInquiry(inq.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-zinc-500 bg-[#161616] rounded-2xl border border-zinc-800">
            No inquiries match your search.
          </div>
        )}
      </div>

      {/* Manual Inquiry Logger Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#181818] border border-zinc-800 rounded-3xl max-w-md w-full p-6 text-zinc-200 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">Log Phone or Walk-in Inquiry</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInquiry} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newInq.customerName}
                  onChange={(e) => setNewInq({ ...newInq, customerName: e.target.value })}
                  placeholder="e.g. Farhana Yasmin"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={newInq.phone}
                  onChange={(e) => setNewInq({ ...newInq, phone: e.target.value })}
                  placeholder="017XXXXXXXX"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <CustomSelect
                theme="dark"
                label="Topic / Inquiry Subject"
                value={newInq.topic}
                onChange={(val) => setNewInq({ ...newInq, topic: val })}
                options={[
                  { value: 'বিয়ের ফুল ও মালা সংরক্ষণ', label: 'বিয়ের ফুল ও মালা সংরক্ষণ' },
                  { value: 'কাস্টম মনোগ্রাম কিপসেক', label: 'কাস্টম মনোগ্রাম কিপসেক' },
                  { value: 'জিওড রেজিন ওয়াল ক্লক', label: 'জিওড রেজিন ওয়াল ক্লক' },
                  { value: 'বেবি মাইলস্টোন কিপসেক', label: 'বেবি মাইলস্টোন কিপসেক' },
                  { value: 'কর্পোরেট ও বাল্ক উপহার', label: 'কর্পোরেট ও বাল্ক উপহার' },
                  { value: 'সাধারণ জিজ্ঞাসা ও ডেলিভারি', label: 'সাধারণ জিজ্ঞাসা ও ডেলিভারি' }
                ]}
              />

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Customer Message / Inquiry Details</label>
                <textarea
                  rows={3}
                  required
                  value={newInq.message}
                  onChange={(e) => setNewInq({ ...newInq, message: e.target.value })}
                  placeholder="Details of the inquiry..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold cursor-pointer"
                >
                  Save Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
