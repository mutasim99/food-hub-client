import { getTotalOrders } from "@/actions/order.action";
import OrderChart from "@/components/modules/order/OrderChart";
import OrderSearch from "@/components/modules/order/OrderSearch";
import OrderSort from "@/components/modules/order/OrderSort";
import OrderStats from "@/components/modules/order/OrderStats";
import OrderTable from "@/components/modules/order/OrderTable";
import PaginationControls from "@/components/modules/order/PaginationControls";

export const dynamic = "force-dynamic";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}) {
  const params = await searchParams;
  const result = await getTotalOrders(params);

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Orders Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Real-time monitoring of your sales and fulfillment.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            Export CSV
          </button>
        </div>
      </div>
      <OrderStats orders={result?.data} meta={result?.meta} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Revenue Trends
            </h3>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              +12.5% Inc
            </span>
          </div>
          <OrderChart orders={result?.data} />
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
            Batch Summary
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                Orders Processed
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {result?.data.length}
              </p>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              These orders represent the current filtered view. Use search and
              sort to drill down into specific data.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Detailed Transactions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Filter by customer email or meal name
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <OrderSearch />
            <OrderSort />
          </div>
        </div>

        <div className="overflow-x-auto">
          <OrderTable orders={result?.data} />
        </div>

        <div className="mt-2">
          <PaginationControls meta={result?.meta}/>
        </div>
      </div>
    </div>
  );
}
