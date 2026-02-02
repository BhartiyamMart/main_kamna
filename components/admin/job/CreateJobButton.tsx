'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateJobDialog } from './CreateJob';

export function CreateJobButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-[#21502c] hover:bg-[#3b864c]">
        <Plus className="mr-2 h-4 w-4" />
        Create Job
      </Button>

      <CreateJobDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
