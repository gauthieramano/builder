import Login from "@/components/login";

export default function Home() {
  return (
    <div className="grid min-h-screen place-content-center p-8 font-sans sm:p-20">
      <div className="flex justify-center sm:max-w-lg">
        <Login />
      </div>
    </div>
  );
}
