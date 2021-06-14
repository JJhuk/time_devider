import 'date-fns';
import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import Button from "@material-ui/core/Button";
import {withStyles} from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker
} from '@material-ui/pickers'

import TextField from '@material-ui/core/TextField';

const styles = ((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
            width: '25ch',
        },
    },
}));


class TimeArea extends React.Component
{
    state = {
        open: false,
        begin_selected_time: new Date("2021-05-05T12:00:00"),
        end_selected_time: new Date("2021-05-05T14:00:00"),
        area_name: ""
    }

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind( this );
    }

    componentDidMount()
    {
        this.setState( {
            open: false,
            begin_selected_time: new Date("2021-05-05T12:00:00"),
            end_selected_time: new Date("2021-05-05T14:00:00"),
            area_name: ""
        } )
        this.onChangeBeginTime = this.onChangeBeginTime.bind( this )
        this.onChangeEndTime = this.onChangeEndTime.bind( this )
        this.onTextChange = this.onTextChange.bind( this )
        this.onConfirmDialog = this.onConfirmDialog.bind( this )
    }

    onCloseDialog()
    {
    }

    onConfirmDialog( event )
    {
        let obj = window.localStorage.getItem("time_area_list")
        if ( obj === null || obj === undefined )
        {
            obj = []
        }
        else
        {
            try
            {
                obj = JSON.parse(obj);
            }
            catch(e)
            {
                obj = [];
            }
        }

        let start_hour = this.state.begin_selected_time.getHours();
        let start_min = this.state.begin_selected_time.getMinutes();

        let end_hour = this.state.end_selected_time.getHours();
        let end_min = this.state.end_selected_time.getMinutes();

        let area_name = this.state.area_name
        obj[ obj.length ] = { area_name: area_name, start_hour: start_hour, start_min: start_min,
            end_hour: end_hour, end_min: end_min }

        window.localStorage.setItem("time_area_list", JSON.stringify(obj))

        console.log( this.state.begin_selected_time + " " + this.state.end_selected_time )
        this.setState( { open: false } )
    }

    onChangeBeginTime(time )
    {
        this.setState({begin_selected_time: time})
    }

    onChangeEndTime( time )
    {
        this.setState( { end_selected_time: time } )
    }

    onTextChange( event )
    {
        this.setState({
            area_name: event.target.value
        })
    }

    render()
    {
        const classes = this.props.classes;

        return (
            <div className={"Popup"}>
                <Button variant="contained" color={"primary"}  onClick={ event => {
                    this.setState( {
                        open: true,
                        begin_selected_time: new Date("2021-05-05T12:00:00"),
                        end_selected_time: new Date("2021-05-05T14:00:00"),
                        area_name: ""
                    } )}}> 권역 설정 </Button>
                <Dialog open={ this.state.open } onClose={this.onCloseDialog}>
                    <DialogTitle> 권역 설정 </DialogTitle>
                    <DialogContent>
                        <p>
                            이제 멋진 권역을 고를 수 있게 될 것입니다 여러분
                        </p>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker-start"
                                label="시작 시간"
                                value={this.state.begin_selected_time}
                                onChange={this.onChangeBeginTime}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker-end"
                                label="종료 시간"
                                value={this.state.end_selected_time}
                                onChange={this.onChangeEndTime}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <form className={classes.root} noValidate autoComplete={"off"}>
                            <TextField id={"input_area_field"} label={"권역 이름"} value={this.state.area_name} onChange={this.onTextChange}/>
                        </form>
                        <Button variant="contained" color={"primary"} onClick={event=>{this.onConfirmDialog( event )}}>확인</Button>
                        <Button variant="contained" color={"secondary"} onClick={event=>{this.setState( {open: false} ) }}>취소</Button>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(TimeArea);