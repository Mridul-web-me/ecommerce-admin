'use client';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Order, OrderItem } from '@prisma/client';
import axios from 'axios';
import { Heading, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface OrderDeleteProps {
  initialData: Order;
}
const OrderDelete: React.FC<OrderDeleteProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    try {
      await axios.delete(`/${params.storeId}/orders/${initialData?.id}`);
      console.log(initialData?.id);
      router.refresh();
      toast.success('Order deleted');
    } catch (error) {
      toast.error('Make sure you removed all order.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          {initialData && (
            <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
              <Trash className="h-4 w-4 " />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDelete;
