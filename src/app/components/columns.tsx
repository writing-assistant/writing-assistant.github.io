"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import structuredFields from "../papers/structured_fields.json";
import { Paper } from "../papers/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions"
import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const allDimensionColumns: ColumnDef<Paper>[] = structuredFields.map(
  (field) => {
    return {
      accessorKey: field.name,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={field.name} />
      ),
      cell: ({ row }) => {
        const writingStages = row.getValue(field.name) as string[];
        return (
          <div className="text-xs">
            {/* {writingStages.map((stage, index) => (
              <span key={index} className="mr-1 text-xs">
                {stage}
              </span>
            ))} */}
            {writingStages.join(", ")}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        const currentRow = row.getValue(id) as string[];
        return value.some((filterValue: string) =>
          currentRow.includes(filterValue)
        );
      },
    };
  }
);

const paperDataColumns: ColumnDef<Paper>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <div className="min-w-[20px]">
        <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return <div className="w-[25px]">{row.getValue("ID")}</div>;
    },
  },
  {
    id: "Paper",
    accessorFn: (originalRow) => {
      return {Paper:originalRow.Paper, URL:originalRow.URL, Authors:originalRow.Authors, Abstract:originalRow.Abstract}
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row, cell }) => {
      return (
        <div className="flex space-x-2 justify-start">
          <div className="max-w-[640px] min-w-[480px]">
            <Accordion type="single" collapsible>
            <AccordionItem value={`${row.getValue("Paper")}`}>
              <AccordionTrigger>
                <span className="max-w-[640px] min-w-[480px] truncate font-medium">
                {(row.getValue("Paper") as any)?.Paper.replace(/\{([^}]+)\}/g, '$1')}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="max-w-[640px] min-w-[480px]">
                  {
                    (row.getValue("Paper") as any)?.Authors && (
                      <div className="text-wrap pb-1">
                        <span className="pr-4 font-medium">  
                            Authors
                        </span>
                        <span className="text-stone-700">{(row.getValue("Paper") as any)?.Authors}</span>
                      </div>
                    )
                  }
                  {
                    (row.getValue("Paper") as any)?.Abstract && (
                      <div className="text-wrap pb-1">
                        <span className="pr-3 font-medium">  
                            Abstract
                        </span>
                        <span className="text-stone-700">{(row.getValue("Paper") as any)?.Abstract}</span>
                      </div>
                    )
                  }
                  <div className="pt-1">
                    <div className="text-wrap pb-1">
                        <span className="pr-3 font-medium">  
                            PDF
                        </span>
                        <span><Badge variant="outline">
                      <Link href={(row.getValue("Paper") as any).URL}>Link</Link>
                    </Badge></span>
                      </div>
                    
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          </div>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "Year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue("Year")}</div>;
    },
    enableHiding: false,
  },
];

export const columns: ColumnDef<Paper>[] = [
  ...paperDataColumns,
  ...allDimensionColumns,
  // ...[{
  //     id: "actions",
  //     cell: ({ row }) => <DataTableRowActions row={row} />,
  //   },]
];
