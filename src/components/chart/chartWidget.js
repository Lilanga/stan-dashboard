import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccessTime from "@material-ui/icons/AccessTime";
import TimeAgo from 'react-timeago'
import ChartGraph from "./chart";
import GridItem from "../../widgets/grid/GridItem";
import GridContainer from "../../widgets/grid/GridContainer";
import Card from "../../widgets/cards/Card.js";
import CardHeader from "../../widgets/cards/CardHeader";
import CardBody from "../../widgets/cards/CardBody";
import CardFooter from "../../widgets/cards/CardFooter";
import styles from "../../styles/components/dashboardStyle";

const useStyles = makeStyles(styles);

export default function ChartWidget(props) {
    const classes = useStyles();
    const { data, title, updatedAt } = props;

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card chart>
                    <CardHeader color="success">
                    <h3 className={classes.cardTitleWhite}>{title}</h3>
                    </CardHeader>
                    <CardBody>
                    <ChartGraph data={data} />
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /><span>{'updated '}<TimeAgo date={updatedAt} minPeriod={5}/></span>
                            </div>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
