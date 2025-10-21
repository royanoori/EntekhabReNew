import { Paper, Typography } from "@mui/material";
import Image from "next/image";
interface WidgetProp {
  title: string;
  image: string;
}
function Widget({ title, image }: WidgetProp) {
  return (
    <Paper className="p-2 flex flex-col justify-between items-center w-full lg:w-2/12 !shadow-none ">
      <div className="w-4/12 flex justify-center">
        <Image alt={title} src={image} width={130} height={130} />
      </div>
      <Typography variant="caption" className="!mt-3">
        {title}
      </Typography>
    </Paper>
  );
}

export default Widget;
