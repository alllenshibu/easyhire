import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function useAlert() {
  const { toast } = useToast();
  function showAlert({ title, variant, type, description }) {
    toast({
      title: title,
      description: description,
      type: type,
      variant: variant,
      duration: 1500,
    });
  }
  return showAlert;
}
