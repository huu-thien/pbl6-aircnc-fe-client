import MessageLeft from "@/components/Chat/Message/MessageLeft";
import MessageRight from "@/components/Chat/Message/MessageRight";
import TextInput from "@/components/Chat/TextInput";
import { Paper } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%",
      height: "97%",
      maxWidth: "100%",
      maxHeight: "97%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      // position: "relative"
      
    },
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: '5px',
      overflowY: "scroll",
      height: "calc( 100% - 20px )",
    }
  })
);
const Message = () => {
    const classes = useStyles();
    return (
      <div className={classes.container}>
        <Paper className={classes.paper} >
          <Paper id="style-1" className={classes.messagesBody}>
            <MessageLeft
              message="Vision, mẫu xe ga quốc dân đã đồng hành cùng triệu khách hàng, nay được thổi làn gió mới Retro mang hơi thở thời đại đầy độc đáo. "
              photoURL=""
              // displayName="Doan Quoc"
              
            />
            <MessageLeft
              message="Vision phiên bản Cổ điển với phong cách Retro từng “gây sốt” ở châu Âu những năm 80, mang thiết kế cổ điển đan xen tối giản, đem đến chiếc xe với diện mạo hoài cổ mà vẫn tôn lên sự năng động và cá tính cho chủ sở hữu."
              photoURL=""
              // displayName="Doan Quoc"
            />
            <MessageRight
              message="Vision, mẫu xe ga quốc dân đã đồng hành cùng triệu khách hàng, nay được thổi làn gió mới Retro mang hơi thở thời đại đầy độc đáo. "
            />
            <MessageRight
              message="Vision, mẫu xe ga quốc dân đã đồng hành cùng triệu khách hàng, nay được thổi làn gió mới Retro mang hơi thở thời đại đầy độc đáo. "
            />
            <MessageLeft
              message="Vision phiên bản Cổ điển với phong cách Retro từng “gây sốt” ở châu Âu những năm 80, mang thiết kế cổ điển đan xen tối giản, đem đến chiếc xe với diện mạo hoài cổ mà vẫn tôn lên sự năng động và cá tính cho chủ sở hữu."
              photoURL=""
              // displayName="Doan Quoc"
            />
            <MessageLeft
              message="Vision phiên bản Cổ điển với phong cách Retro từng “gây sốt” ở châu Âu những năm 80, mang thiết kế cổ điển đan xen tối giản, đem đến chiếc xe với diện mạo hoài cổ mà vẫn tôn lên sự năng động và cá tính cho chủ sở hữu."
              photoURL=""
              // displayName="Doan Quoc"
            />
            <MessageLeft
              message="Vision phiên bản Cổ điển với phong cách Retro từng “gây sốt” ở châu Âu những năm 80, mang thiết kế cổ điển đan xen tối giản, đem đến chiếc xe với diện mạo hoài cổ mà vẫn tôn lên sự năng động và cá tính cho chủ sở hữu."
              photoURL=""
              // displayName="Doan Quoc"
            />
          </Paper>
          <TextInput />
        </Paper>
      </div>
    );
}

export default Message
