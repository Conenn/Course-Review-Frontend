import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { grey } from "@mui/material/colors";
import ReactMarkdown from "react-markdown";

function CommentCard(...props) {
  const timestamp = new Date(props[0].data.createdDate).toLocaleDateString(
    "en-US",
    { timeZone: "UTC" }
  );

  return (
    <Card sx={{ boxShadow: `0 5px 15px 0 ${grey[300]}` }}>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography color="text.secondary">
            {props[0].data.courseId} - {props[0].course} Reviewed on {timestamp}
          </Typography>
        </Box>
        <article>
          <ReactMarkdown
            linkTarget={"_blank"}
            children={props[0].data.comment}
          />
        </article>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Chip
            label={`Workload ${props[0].data.workload}`}
            variant="outlined"
          ></Chip>
          <Chip
            label={`Rating ${props[0].data.rating}`}
            sx={{ ml: 1 }}
            variant="outlined"
            color="primary"
          ></Chip>
        </Box>
      </CardContent>
    </Card>
  );
}
export default CommentCard;
