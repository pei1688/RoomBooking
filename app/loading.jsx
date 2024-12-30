import { Spinner } from "@nextui-org/spinner";

function loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner
        size="lg"
        color="secondary"
        label="載入中"
        labelColor="secondary"
      />
    </div>
  );
}

export default loading;
