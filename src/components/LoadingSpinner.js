import { RiLoader2Line } from "react-icons/ri";
import { useLoading } from "@/app/layout";

const LoadingSpinner = () => {
  const [isLoading] = useLoading();

  if (!isLoading) return null;

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-white bg-opacity-75 z-50">
      <p className="animate-spin text-3xl">
        <RiLoader2Line />
      </p>
    </div>
  );
};

export default LoadingSpinner;
