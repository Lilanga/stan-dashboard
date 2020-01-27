import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccessTime from "@material-ui/icons/AccessTime";
import Link from "@material-ui/core/Link";
import { useSelector } from "react-redux";
import TimeAgo from 'react-timeago'
import RecentMessages from "./recentMessages";
import { selectLastFiveMessages } from "../../utils/selectorUtils";
import GridItem from "../../widgets/grid/GridItem";
import GridContainer from "../../widgets/grid/GridContainer";
import Card from "../../widgets/cards/Card.js";
import CardHeader from "../../widgets/cards/CardHeader";
import CardBody from "../../widgets/cards/CardBody";
import CardFooter from "../../widgets/cards/CardFooter";
import styles from "../../styles/components/dashboardStyle";

const useStyles = makeStyles(styles);
function preventDefault(event) {
    event.preventDefault();
}

export default function RecentMessagesWidget(props) {
    const classes = useStyles();
    const { title } = props;
    const recentMessages = useSelector(selectLastFiveMessages);
    const [messagesUpdated, setMessagesUpdated] = useState(new Date());

    useEffect(() => {
        setMessagesUpdated(new Date());
      }, [recentMessages]);

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card chart>
                    <CardHeader color="success">
                        <h3 className={classes.cardTitleWhite}>{title}</h3>
                    </CardHeader>
                    <CardBody>
                        <RecentMessages recentMessages={recentMessages} headerColor="success" />
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> <span>{'updated '}<TimeAgo date={messagesUpdated} minPeriod={5}/></span>
                            </div>
                        <Link color="primary" href="#" onClick={preventDefault}>
                            See more messages
                        </Link>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
