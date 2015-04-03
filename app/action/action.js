/**
 * Created by lololol on 3/Apr/15.
 */
var FetchData = React.createClass({
    parseData: function() {
        var newAction = [];
        var recordedAction = [];
        Parse.initialize("um9oVWPvPKifvhsyGfoRdbQwDvjrVJFOCcTEWTiS", "jdrKlqoQvTx8xXdyiMz8QeFxExziLa49nmqRXHNm");
        var ParseObject = Parse.Object.extend("action");
        var parseObject = new Parse.Query(ParseObject);
        parseObject.equalTo("visible", true);
        parseObject.descending("date");
        parseObject.find({
            success: function(list) {
                // Successfully retrieved the object.
                var today = new Date();

                for (var i = 0, n = 0, r = 0; i < list.length; i++) {
                    var object = list[i];
                    if (object.get('date') > today) {
                        newAction[n] = {};
                        if (object.get('link') == null || object.get('link') === "") {
                            newAction[n].link = "";
                        } else {
                            newAction[n].link = object.get('link');
                        }
                        newAction[n].month = object.get('date').getMonth() + 1;
                        newAction[n].date = object.get('date').getDate();
                        newAction[n].title = object.get('title');
                        n ++;
                    } else {
                        recordedAction[r] = {};
                        if (object.get('link') == null || object.get('link') === "") { //load 圖片
                            recordedAction[r].link = object.get('photo').url();
                            recordedAction[r].img = object.get('photo').url();
                            recordedAction[r].content = "img";
                        } else { //load 影片
                            recordedAction[r].link = object.get('link');
                            recordedAction[r].img = "http://img.youtube.com/vi/" + recordedAction[r].link.substring(32, 43) + "/hqdefault.jpg";
                            recordedAction[r].link = "http://www.youtube.com/embed/" + object.get('link').substring(32, 43) + "?autoplay=false";
                            recordedAction[r].content = "video";
                        }
                        recordedAction[r].month = object.get('date').getMonth() + 1;
                        recordedAction[r].date = object.get('date').getDate();
                        recordedAction[r].title = object.get('title');
                        recordedAction[r].width = object.get('width');
                        recordedAction[r].height = object.get('height');
                        r ++;
                    }
                }
                this.setState({newAction: newAction, recordedAction: recordedAction});
            }.bind(this),
            error: function(error) {
            }
        });
    },
    getInitialState: function() {
        return {newAction: [], recordedAction: []};
    },
    componentDidMount: function() {
        this.parseData();
    },
    render: function() {
        var newActionMap = this.state.newAction.map(function (newAction) {
            return (
                <h3 className="party-sidebar-h3"><li className="party-li"><span className="party-span">2015.{newAction.month}.{newAction.date}</span>{newAction.title}</li></h3>
            );
        });
        var recordedActionMap = this.state.recordedAction.map(function (recordedAction) {
            if (recordedAction.content.localeCompare("img") == 0) {
                return (
                    <div className="party-action_record-dialog-div">
                        <label htmlFor={"2015" + recordedAction.month + recordedAction.date + recordedAction.title}>
                            <div className="alias-clickable-div">
                                <div className={this.props.classWithDisplay} title={"2015" + recordedAction.month + recordedAction.date + recordedAction.title}>
                                    <div className="alias-image-background">
                                        <img className="party-action_record-dialog-img" src={recordedAction.img} width="300px;" />
                                        <div className="party-action_record-dialog-text_div">
                                            <span>2015.{recordedAction.month}.{recordedAction.date}.{recordedAction.title}</span>
                                        </div>
                                    </div>
                                    <img width={recordedAction.width} height={recordedAction.height} src={this.props.partySrc} alt="" className="alias-image-party"/>
                                    <h3 className={this.props.nameClass}>{this.props.name}</h3>
                                </div>
                            </div>
                        </label>
                        <input className="modal-state" id={"2015" + recordedAction.month + recordedAction.date + recordedAction.title} type="checkbox" />
                        <div className="modal">
                            <label className="modal__bg" htmlFor={"2015" + recordedAction.month + recordedAction.date + recordedAction.title}></label>
                            <div className="modal__inner party-action_record-dialog-text_div">
                                <label className="modal__close" htmlFor={"2015" + recordedAction.month + recordedAction.date + recordedAction.title}></label>
                                <h2>{"2015" + recordedAction.month + recordedAction.date + recordedAction.title}</h2>
                                <img width="100%" height="auto" src={recordedAction.link} />
                            </div>
                        </div>
                    </div>
                ) ;
            } else {
                return (
                    <div className="party-action_record-dialog-div">
                        <label htmlFor={"2015" + recordedAction.month + recordedAction.date + recordedAction.title}>
                            <div className="alias-clickable-div">
                                <div className={this.props.classWithDisplay} title={"2015" + recordedAction.month + recordedAction.date + recordedAction.title}>
                                    <div className="alias-image-background">
                                        <img className="party-action_record-dialog-img" src={recordedAction.img} width="300px;" />
                                        <div className="party-action_record-dialog-text_div">
                                            <span>2015.{recordedAction.month}.{recordedAction.date}.{recordedAction.title}</span>
                                        </div>
                                    </div>
                                    <img src={this.props.partySrc} alt="" className="alias-image-party"/>
                                    <h3 className={this.props.nameClass}>{this.props.name}</h3>
                                </div>
                            </div>
                        </label>
                        <input className="modal-state" id={"2015" + recordedAction.month + recordedAction.date + recordedAction.title} type="checkbox" />
                        <div className="modal">
                            <label className="modal__bg" htmlFor={"2015" + recordedAction.month + recordedAction.date + recordedAction.title}></label>
                            <div className="modal__inner party-action_record-dialog-text_div">
                                <label className="modal__close" htmlFor={"2015" + recordedAction.month + recordedAction.date + recordedAction.title}></label>
                                <h2>{"2015" + recordedAction.month + recordedAction.date + recordedAction.title}</h2>
                                <div className="video-container">
                                    <iframe src={recordedAction.link}>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                ) ;
            }

        }.bind(this));
        return (
            <div>
                <div className="leg-full-screen-width party-action-our_action_and_recent_movement">
                    <div className="leg-full-content">
                        <div className="party-action-parallel-div">
                            <h1 className="party-sidebar-h1">我們的行動</h1>
                            <ol className="party-sidebar-ol">
                                <li><h3 className="party-sidebar-h3">一、拜會朝野主要政黨領袖</h3></li>
                                <li><h3 className="party-sidebar-h3">二、要求立委簽署修法承諾書</h3></li>
                                <li><h3 className="party-sidebar-h3">三、全國巡迴說明動員</h3></li>
                                <li><h3 className="party-sidebar-h3">四、「318還權於民」立法院繞行包圍</h3></li>
                                <li><h3 className="party-sidebar-h3">五、「410還權於民」立法院外人民大集結</h3></li>
                            </ol>
                        </div>
                        <div className="party-action-parallel-div party-action-recent_movement">
                            <h1 className="party-sidebar-h1">近期活動</h1>
                            <ol className="party-sidebar-ol">
                            {newActionMap}
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="leg-full-screen-width party-action-recent_record">
                    <div className="leg-full-screen-width">
                        <div className="leg-full-content">
                            <h1 className="party-sidebar-h1">行動紀錄</h1>
                            <ol className="party-sidebar-ol">
                            {recordedActionMap}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
React.render(
    <FetchData/>,
    document.getElementById('party-action-react')
);
