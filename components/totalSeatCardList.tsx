import { Card, CardContent } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function totalSeatCardList(props : any) {
    const { total_seats, reserve_seats, cancelled_seats} = props;
  return (
    <div className="flex gap-4 justify-center">
      {/* Card 1: Total of seats */}
      <Card className="w-64 bg-blue-500 text-white shadow-md">
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <Icon icon="mdi:account" width="32" height="32" />
          <p className="text-sm font-semibold">Total of seats</p>
          <p className="text-2xl font-bold">{total_seats}</p>
        </CardContent>
      </Card>

      {/* Card 2: Reserve */}
      <Card className="w-64 bg-green-500 text-white shadow-md">
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <Icon icon="mdi:ribbon" width="32" height="32" />
          <p className="text-sm font-semibold">Reserve</p>
          <p className="text-2xl font-bold">{reserve_seats}</p>
        </CardContent>
      </Card>

      {/* Card 3: Cancel */}
      <Card className="w-64 bg-red-500 text-white shadow-md">
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <Icon icon="mdi:close-circle" width="32" height="32" />
          <p className="text-sm font-semibold">Cancel</p>
          <p className="text-2xl font-bold">{cancelled_seats}</p>
        </CardContent>
      </Card>
    </div>
  );
}
