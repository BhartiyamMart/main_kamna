'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateJobDialog } from './CreateJob';

export function CreateJobButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer text-xs md:text-sm items-center gap-1 rounded-lg bg-[#21502c] hover:bg-[#3b864c] px-0.5 py-0.5 md:px-2 md:py-2 font-medium text-white shadow-sm transition-all duration-200  disabled:cursor-not-allowed disabled:opacity-50"
        // className="bg-[#21502c] hover:bg-[#3b864c] flex items-center gap-0.5"
      >
        <Plus  size={20}/>
      Create Job
      </Button>


      <CreateJobDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
