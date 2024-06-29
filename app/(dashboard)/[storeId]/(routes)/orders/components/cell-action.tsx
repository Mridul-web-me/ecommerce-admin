import React, { useState } from 'react';
import { OrderColumn } from './columns';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AlertModal } from '@/components/modals/alert-modal';
import { Order } from '@prisma/client';

interface CellActionProps {
  data: Order;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    try {
      await axios.delete(`/${params.storeId}/orders/${data.id}`);
      console.log(data.id);
      console.log(data.isPaid);
      router.refresh();
      router.push(`/${params.storeId}/orders`);
      toast.success(' deleted');
    } catch (error) {
      toast.error('Make sure you removed all order.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
        <Trash className="h-4 w-4 " />
      </Button>
    </div>
  );
};

export default CellAction;
