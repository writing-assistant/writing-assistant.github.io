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

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const structuredFieldsGrouped = structuredFields.reduce((acc, field) => {
  const key = field.category;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(field);
  return acc;
}, {} as Record<string, typeof structuredFields>);

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
    accessorFn: (originalRow): Paper => originalRow,
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
                  {/* {
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
                        <span>
                          <Badge variant="outline">
                            <Link href={(row.getValue("Paper") as any).URL}>Link</Link>
                          </Badge>
                        </span>
                      </div>
                  </div> */}
                  <div className="pt-1 read-paper-icon">
                    <div className="text-wrap pb-4">
                        <span>
                          <Badge variant="outline">
                            <Link href={(row.getValue("Paper") as any).URL} target="_blank">Read paper</Link>
                          </Badge>
                        </span>
                      </div>
                  </div>
                  {
                    Object.keys(structuredFieldsGrouped).map((category) => {
                      const fields = structuredFieldsGrouped[category];
                      return (
                        <div key={category} className="py-1">
                          <div className="flex flex-row">
                            <div className="basis-2/12">
                              <Badge variant="secondary" className="capitalize">
                                {category}
                              </Badge>
                            </div>
                            <div className="basis-10/12">
                              <div className="flex flex-row flex-wrap gap-x-3 gap-y-1">
                              {fields
                                .filter((field) => row.getValue(field.name) && (row.getValue(field.name) as string).length > 0)
                                .map((field) => {
                                  const values: string[] = row.getValue(field.name);
                                  return values ? (
                                    <div className="flex-initial">
                                      <HoverCard key={field.name}>
                                      <HoverCardTrigger className="transition duration-[5ms] delay-[0ms]">
                                        <span className="hover:underline">
                                        {Array.isArray(values) ? values.join(", ") : values}
                                        </span>
                                      </HoverCardTrigger>
                                      <HoverCardContent className="transition duration-[5ms] delay-[0ms]">
                                        <span>
                                        {field.name}
                                        </span>
                                      </HoverCardContent>
                                    </HoverCard>
                                    </div>
                                  ) : null;
                                })
                              }
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
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
