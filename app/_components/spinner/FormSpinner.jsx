import { Spinner } from "@nextui-org/spinner";

function FormSpinner() {
  return (
    <div className="flex justify-center h-screen items-center">
      <Spinner
        size="lg"
        color="secondary"
        label="載入中"
        labelColor="secondary"
      />
    </div>
  );
}

export default FormSpinner;
