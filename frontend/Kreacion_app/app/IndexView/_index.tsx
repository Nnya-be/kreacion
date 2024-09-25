import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Kreacion" },
    { name: "description", content: "A world of Kreacion " },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
     <h1 className="text-3xl font-bold">Welcome to Kreacion</h1>
    </div>
  )
}
