"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

// import { priorities, statuses } from "../data/data"
import { groupedFieldsByCategory } from "../papers/schema";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const categories = Object.keys(groupedFieldsByCategory);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter papers..."
            value={(table.getColumn("Paper")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("Paper")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {/* {categories.map((cat) => {
            return (
              <div key={cat} >
                {groupedFieldsByCategory[cat].map((field) => {
                  if (table.getColumn(field.name)) {
                    return (
                      <DataTableFacetedFilter
                        key={field.name}
                        column={table.getColumn(field.name)}
                        title={field.name}
                        options={field.values}
                      />
                    );
                  }
                })}
              </div>
            );
          })} */}
          <Tabs defaultValue={categories[0]} className=""> 
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="capitalize">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((cat) => (
              <TabsContent key={cat} value={cat}>
                <div>
                  {groupedFieldsByCategory[cat].map((field) => {
                    if (table.getColumn(field.name)) {
                      return (
                        <DataTableFacetedFilter
                          key={field.name}
                          column={table.getColumn(field.name)}
                          title={field.name}
                          options={field.values}
                        />
                      );
                    }
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}
