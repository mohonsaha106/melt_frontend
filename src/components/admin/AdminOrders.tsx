import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AdminOrder, OrderStatus } from '../../types/admin';
import { 
  Search, 
  Eye, 
  Truck, 
  X, 
  Trash2, 
  Phone, 
  Printer, 
  MessageCircle 
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder } = useAdmin();

  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('all');
  const [activeOrder, setActiveOrder] = useState<AdminOrder | null>(null);

  // Status transition modal state
  const [shippingModalOrder, setShippingModalOrder] = useState<AdminOrder | null>(null);
  const [courierInput, setCourierInput] = useState<AdminOrder['courierName']>('Steadfast');
  const [trackingInput, setTrackingInput] = useState<string>('');
  const [notesInput, setNotesInput] = useState<string>('');

  const statusList = [
    'All',
    'Order Placed',
    'Advance Confirmed',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled'
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
      const matchesDelivery = selectedDelivery === 'all' || order.deliveryMethod === selectedDelivery;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        q === '' ||
        order.orderId.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.phone.includes(q) ||
        order.district.toLowerCase().includes(q) ||
        order.address.toLowerCase().includes(q);

      return matchesStatus && matchesDelivery && matchesSearch;
    });
  }, [orders, selectedStatus, selectedDelivery, searchQuery]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Order Placed':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-300';
      case 'Advance Confirmed':
        return 'bg-sky-500/15 border-sky-500/30 text-sky-300';
      case 'Processing':
        return 'bg-purple-500/15 border-purple-500/30 text-purple-300';
      case 'Shipped':
        return 'bg-blue-500/15 border-blue-500/30 text-blue-300';
      case 'Delivered':
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
      case 'Cancelled':
        return 'bg-rose-500/15 border-rose-500/30 text-rose-300';
      default:
        return 'bg-zinc-800 text-zinc-300';
    }
  };

  const handleOpenShippingModal = (order: AdminOrder) => {
    setShippingModalOrder(order);
    setCourierInput(order.courierName || 'Steadfast');
    setTrackingInput(order.trackingCode || `STDF-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleConfirmShipping = () => {
    if (!shippingModalOrder) return;
    updateOrderStatus(
      shippingModalOrder.orderId,
      'Shipped',
      courierInput,
      trackingInput,
      shippingModalOrder.adminNotes || 'Handed over to courier hub for delivery.'
    );
    if (activeOrder && activeOrder.orderId === shippingModalOrder.orderId) {
      setActiveOrder({
        ...activeOrder,
        status: 'Shipped',
        courierName: courierInput,
        trackingCode: trackingInput
      });
    }
    setShippingModalOrder(null);
  };

  const handleSaveNotes = (orderId: string) => {
    updateOrderStatus(orderId, activeOrder?.status || 'Processing', activeOrder?.courierName, activeOrder?.trackingCode, notesInput);
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, adminNotes: notesInput });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-white tracking-tight">
            Order Production & Courier Manager
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track customer orders, verify ৳50 tokens, manage resin curing cycles, and dispatch parcels.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3.5 py-1.5 rounded-xl border border-zinc-800">
          Total Orders: <strong className="text-white">{orders.length}</strong>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-[#161616] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
        
        {/* Search Bar & Delivery Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID (MS-...), Customer Name, Phone, District..."
              className="w-full bg-zinc-900 hover:bg-zinc-850 focus:bg-zinc-900 border border-zinc-700/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDelivery}
              onChange={(e) => setSelectedDelivery(e.target.value)}
              className="bg-zinc-900 border border-zinc-700/80 rounded-xl py-2.5 px-3.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="all">All Delivery Locations</option>
              <option value="dhaka">Inside Dhaka (৳60)</option>
              <option value="outside">Outside Dhaka (৳110)</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center overflow-x-auto gap-2 pb-1 no-scrollbar text-xs">
          {statusList.map(status => {
            const isSelected = selectedStatus === status;
            const count = status === 'All' 
              ? orders.length 
              : orders.filter(o => o.status === status).length;

            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`
                  px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5
                  ${isSelected
                    ? 'bg-amber-400 text-black shadow-sm font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }
                `}
              >
                <span>{status}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-[#161616] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-900/80 text-zinc-400 uppercase tracking-wider font-mono border-b border-zinc-800 text-[11px]">
                <th className="py-3 px-4 font-semibold">Order</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Address</th>
                <th className="py-3 px-4 font-semibold">Items</th>
                <th className="py-3 px-4 font-semibold">Financials</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.orderId} className="hover:bg-zinc-850/50 transition-colors">
                    
                    {/* Order ID & Date */}
                    <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                      <button
                        onClick={() => {
                          setActiveOrder(order);
                          setNotesInput(order.adminNotes || '');
                        }}
                        className="text-amber-400 hover:underline flex items-center space-x-1"
                      >
                        <span>{order.orderId}</span>
                      </button>
                      <div className="text-[10px] text-zinc-500 font-sans font-normal mt-0.5">{order.createdAt}</div>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-zinc-200">{order.customerName}</div>
                      <div className="text-[11px] text-zinc-400 flex items-center space-x-2 mt-0.5">
                        <a href={`tel:${order.phone}`} className="hover:underline text-zinc-300">
                          {order.phone}
                        </a>
                        <a
                          href={`https://wa.me/880${order.phone.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300"
                          title="WhatsApp chat"
                        >
                          <MessageCircle className="w-3.5 h-3.5 inline" />
                        </a>
                      </div>
                    </td>

                    {/* Address & Courier */}
                    <td className="py-3.5 px-4 text-zinc-300 max-w-[200px]">
                      <div className="font-medium text-white">{order.district} • {order.thana}</div>
                      <div className="text-[11px] text-zinc-400 truncate mt-0.5">{order.address}</div>
                    </td>

                    {/* Items count & preview */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-zinc-200">
                        {order.items.reduce((acc, i) => acc + i.quantity, 0)} Keepsakes
                      </div>
                      <div className="text-[10px] text-zinc-500 truncate max-w-[150px]">
                        {order.items.map(i => i.name).join(', ')}
                      </div>
                    </td>

                    {/* Financials */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-white">৳{order.total}</div>
                      <div className="text-[10px] text-emerald-400">Advance: ৳{order.advanceAmount}</div>
                      <div className="text-[10px] text-amber-400 font-bold">Due COD: ৳{order.dueAmount}</div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                      {order.trackingCode && (
                        <div className="text-[10px] font-mono text-zinc-500 mt-1">
                          {order.courierName}: {order.trackingCode}
                        </div>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => {
                          setActiveOrder(order);
                          setNotesInput(order.adminNotes || '');
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                        title="View Full Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {order.status === 'Order Placed' && (
                        <button
                          onClick={() => updateOrderStatus(order.orderId, 'Advance Confirmed')}
                          className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Confirm ৳50
                        </button>
                      )}

                      {order.status === 'Advance Confirmed' && (
                        <button
                          onClick={() => updateOrderStatus(order.orderId, 'Processing')}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Send to Curing
                        </button>
                      )}

                      {order.status === 'Processing' && (
                        <button
                          onClick={() => handleOpenShippingModal(order)}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Ship Courier
                        </button>
                      )}

                      {order.status === 'Shipped' && (
                        <button
                          onClick={() => updateOrderStatus(order.orderId, 'Delivered')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">
                    No orders match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          ORDER DETAIL MODAL & INVOICE INSPECTOR
         ======================================================== */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
          <div className="relative bg-[#181818] border border-zinc-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl p-6 sm:p-8 text-zinc-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold font-mono">
                  MS
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <span>Order {activeOrder.orderId}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold border ${getStatusBadge(activeOrder.status)}`}>
                      {activeOrder.status}
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400">Placed on {activeOrder.createdAt}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  title="Print Invoice"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveOrder(null)}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Customer & Shipping Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-b border-zinc-800 text-xs">
              <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 space-y-2">
                <span className="font-mono text-zinc-400 uppercase font-semibold text-[10px]">Recipient Details</span>
                <div className="font-bold text-sm text-white">{activeOrder.customerName}</div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <a href={`tel:${activeOrder.phone}`} className="text-amber-400 font-semibold hover:underline">
                    {activeOrder.phone}
                  </a>
                  <a
                    href={`https://wa.me/880${activeOrder.phone.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>

              <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 space-y-2">
                <span className="font-mono text-zinc-400 uppercase font-semibold text-[10px]">Delivery Destination</span>
                <div className="font-semibold text-white">{activeOrder.district} • {activeOrder.thana}</div>
                <div className="text-zinc-400">{activeOrder.address}</div>
                <div className="text-[10px] text-zinc-500 font-mono">
                  Method: {activeOrder.deliveryMethod === 'dhaka' ? 'Inside Dhaka (৳60)' : 'Outside Dhaka - 64 Districts (৳110)'}
                </div>
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="py-6 border-b border-zinc-800 space-y-3">
              <h4 className="font-mono text-zinc-400 uppercase font-semibold text-xs">
                Handcrafted Keepsake Items ({activeOrder.items.length})
              </h4>

              <div className="space-y-3">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-xl border border-zinc-700 shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-xs text-white">{item.name}</h5>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          Size / Variant: <strong className="text-zinc-200">{item.size}</strong> • Qty: <strong className="text-zinc-200">{item.quantity}</strong>
                        </div>
                        {item.customText && (
                          <div className="mt-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px]">
                            Custom Monogram: <strong>"{item.customText}"</strong> {item.customFont && `(${item.customFont})`}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="font-bold text-white text-xs">৳{item.price * item.quantity}</div>
                      <div className="text-[10px] text-zinc-500">৳{item.price} each</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Breakdown Table */}
            <div className="py-6 border-b border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Left: Artisan Production & Tracking status */}
              <div className="space-y-3">
                <span className="font-mono text-zinc-400 uppercase font-semibold text-xs">Production & Courier Note</span>
                
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="Enter production notes (e.g., flowers dried, curing layer 1 done)..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleSaveNotes(activeOrder.orderId)}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              {/* Right: Payment details */}
              <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span>৳{activeOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery Fee:</span>
                  <span>৳{activeOrder.deliveryFee}</span>
                </div>
                {activeOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span>-৳{activeOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-zinc-800">
                  <span>Total Order:</span>
                  <span>৳{activeOrder.total}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold pt-1">
                  <span>Advance Received:</span>
                  <span>৳{activeOrder.advanceAmount}</span>
                </div>
                <div className="flex justify-between text-amber-400 font-bold text-sm bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                  <span>Balance Due on COD:</span>
                  <span>৳{activeOrder.dueAmount}</span>
                </div>
              </div>

            </div>

            {/* Workflow Action Bar */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete order ${activeOrder.orderId}?`)) {
                    deleteOrder(activeOrder.orderId);
                    setActiveOrder(null);
                  }
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Order</span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                {activeOrder.status === 'Order Placed' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(activeOrder.orderId, 'Advance Confirmed');
                      setActiveOrder({ ...activeOrder, status: 'Advance Confirmed' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all cursor-pointer shadow-md"
                  >
                    Confirm ৳50 Advance Token
                  </button>
                )}

                {activeOrder.status === 'Advance Confirmed' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(activeOrder.orderId, 'Processing');
                      setActiveOrder({ ...activeOrder, status: 'Processing' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                  >
                    Send to 72h Curing Cycle
                  </button>
                )}

                {activeOrder.status === 'Processing' && (
                  <button
                    onClick={() => handleOpenShippingModal(activeOrder)}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                  >
                    Dispatch via Courier
                  </button>
                )}

                {activeOrder.status === 'Shipped' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(activeOrder.orderId, 'Delivered');
                      setActiveOrder({ ...activeOrder, status: 'Delivered' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          DISPATCH / COURIER SHIPPING MODAL
         ======================================================== */}
      {shippingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#181818] border border-zinc-800 rounded-3xl max-w-md w-full p-6 text-zinc-200 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-sm">Courier Shipping Details</h3>
              </div>
              <button onClick={() => setShippingModalOrder(null)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Assign courier and tracking code for Order <strong>{shippingModalOrder.orderId}</strong> ({shippingModalOrder.customerName}).
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Courier Service</label>
                <select
                  value={courierInput}
                  onChange={(e) => setCourierInput(e.target.value as AdminOrder['courierName'])}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Steadfast">Steadfast Courier</option>
                  <option value="Pathao">Pathao Courier</option>
                  <option value="RedX">RedX Logistics</option>
                  <option value="Paperfly">Paperfly</option>
                  <option value="Sundarban">Sundarban Courier</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Courier Tracking Code / Parcel ID</label>
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="e.g. STDF-849201"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end space-x-2">
              <button
                onClick={() => setShippingModalOrder(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmShipping}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
