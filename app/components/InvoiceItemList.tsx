import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

interface Item {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface InvoiceItemListProps {
  items: Item[];
  setItems: (items: Item[]) => void;
  currency: string;
}

export function InvoiceItemList({
  items,
  setItems,
  currency,
}: InvoiceItemListProps) {
  const addItem = () => {
    setItems([
      ...items,
      { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      }),
    );
  };

  const calculateTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0,
  );

  const inputClass =
    "h-10 bg-slate-50 border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600 focus-visible:bg-white transition-all";

  return (
    <>
      {/* Header row — desktop only */}
      <div className="hidden sm:grid grid-cols-12 gap-4 mb-2">
        <p className="col-span-5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Description
        </p>
        <p className="col-span-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Qty
        </p>
        <p className="col-span-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Rate
        </p>
        <p className="col-span-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Amount
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-3 group relative">
            <div className="col-span-12 sm:col-span-5">
              <Label className="sm:hidden text-xs font-medium text-slate-500 mb-1 block">
                Description
              </Label>
              <Textarea
                value={item.description}
                onChange={(e) =>
                  updateItem(item.id, "description", e.target.value)
                }
                placeholder="Item name & description"
                className="bg-slate-50 border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600 focus-visible:bg-white transition-all resize-none"
                rows={2}
              />
            </div>

            <div className="col-span-4 sm:col-span-2">
              <Label className="sm:hidden text-xs font-medium text-slate-500 mb-1 block">
                Qty
              </Label>
              <Input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(item.id, "quantity", Number(e.target.value))
                }
                className={inputClass}
              />
            </div>

            <div className="col-span-4 sm:col-span-2">
              <Label className="sm:hidden text-xs font-medium text-slate-500 mb-1 block">
                Rate
              </Label>
              <Input
                type="number"
                min="0"
                value={item.rate}
                onChange={(e) =>
                  updateItem(item.id, "rate", Number(e.target.value))
                }
                className={inputClass}
              />
            </div>

            <div className="col-span-4 sm:col-span-2">
              <Label className="sm:hidden text-xs font-medium text-slate-500 mb-1 block">
                Amount
              </Label>
              <Input
                value={formatCurrency({
                  amount: item.quantity * item.rate,
                  currency: currency as any,
                })}
                disabled
                className="h-10 bg-slate-100 border-slate-200 rounded-xl text-sm font-semibold text-slate-700 cursor-not-allowed"
              />
            </div>

            <div className="col-span-12 sm:col-span-1 flex items-center justify-end sm:justify-center">
              {items.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={addItem}
          className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none rounded-xl text-sm font-medium h-10 px-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Total summary */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="flex justify-end">
          <div className="w-full sm:w-64 flex flex-col gap-1">
            <div className="flex items-center justify-between py-1 text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium text-slate-700">
                {formatCurrency({
                  amount: calculateTotal,
                  currency: currency as any,
                })}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-slate-100 mt-1">
              <span className="text-base font-semibold text-slate-900">
                Total
              </span>
              <span className="text-lg font-bold text-blue-600">
                {formatCurrency({
                  amount: calculateTotal,
                  currency: currency as any,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
