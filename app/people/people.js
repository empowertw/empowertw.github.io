/**
 * Created by lololol on 3/Apr/15.
 */
var FetchData = React.createClass({
    parseData: function() {
        var peopleVideo = [];
        var jumbotronVideo = [];
        Parse.initialize("um9oVWPvPKifvhsyGfoRdbQwDvjrVJFOCcTEWTiS", "jdrKlqoQvTx8xXdyiMz8QeFxExziLa49nmqRXHNm");
        var ParseObject = Parse.Object.extend("people");
        var parseObject = new Parse.Query(ParseObject);
        parseObject.equalTo("visible", true);
        parseObject.find({
            success: function(list) {
                var jumbotronID = $.cookie("jumbotronID");
                if (jumbotronID === null || jumbotronID === undefined || jumbotronID >= list.length || jumbotronID < 0) {
                    jumbotronID = 0;
                    $.cookie("jumbotronID", 0);
                }
                jumbotronVideo[0] = {};
                jumbotronVideo[0].link = "";
                //console.log("jumbotronID:" + jumbotronID);
                //console.log(list[0]);
                //console.log(list[jumbotronID]);
                var object = list[jumbotronID];
                //console.log(object.get('link'));
                if (object.get('link') == null || object.get('link') === "") {
                    jumbotronVideo[0].link = "";
                } else {
                    jumbotronVideo[0].link = object.get('link');
                }
                console.log("jumbotronVideo[0].link:" + jumbotronVideo[0].link);
                jumbotronVideo[0].img = "http://img.youtube.com/vi/" + jumbotronVideo[0].link.substring(32, 43) + "/hqdefault.jpg";
                jumbotronVideo[0].link = "http://www.youtube.com/embed/" + jumbotronVideo[0].link.substring(32, 43) + "?autoplay=false";
                jumbotronVideo[0].title = object.get('title');
                //console.log("jumbotronVideo: " + jumbotronVideo.img);
                //console.log("jumbotronVideo: " + jumbotronVideo.link);
                for (var i = 1, n = 0; i < list.length; i++) {
                    peopleVideo[n] = {};
                    var object = list[(i + parseInt(jumbotronID) + list.length) % list.length];
                    peopleVideo[n].index = (i + parseInt(jumbotronID) + list.length) % list.length;
                    if (object.get('link') == null || object.get('link') === "") {
                        peopleVideo[n].link = "";
                    } else {
                        peopleVideo[n].link = object.get('link');
                    }
                    peopleVideo[n].link = object.get('link');
                    //console.log("peopleVideo[n].link: " + peopleVideo[n].link);
                    peopleVideo[n].img = "http://img.youtube.com/vi/" + peopleVideo[n].link.substring(32, 43) + "/hqdefault.jpg";
                    peopleVideo[n].link = "http://www.youtube.com/embed/" + peopleVideo[n].link.substring(32, 43) + "?autoplay=false";
                    peopleVideo[n].title = object.get('title');
                    n ++;
                }
                //console.log("jumbotronVideo: " + jumbotronVideo.img);
                //console.log("peopleVideo[n].img" + peopleVideo[2].img);
                //console.log("jumbotronID" + jumbotronID);
                this.setState({peopleVideo: peopleVideo, jumbotronVideo: jumbotronVideo});
            }.bind(this),
            error: function(error) {
            }
        });
    },
    getInitialState: function() {
        return {peopleVideo: [], jumbotronVideo: []};
    },
    handleClick: function(index) {
        console.log(index);
        $.cookie("jumbotronID", index);
        console.log("jumbotronID: " + $.cookie("jumbotronID"));
        this.parseData();
        location.reload();
    },
    componentDidMount: function() {
        this.parseData();
    },
    render: function() {
        var jumbotronVideoMap = this.state.jumbotronVideo.map(function (jumbotronVideo) {
            return (
                <div className="party-content">
                    <embed className="people-video-jumbotron" src={jumbotronVideo.link} />
                    <h1 className="party-h1" styles="float: left;">{jumbotronVideo.title}</h1>
                </div>
            );
        }.bind(this));
        var peopleVideoMap = this.state.peopleVideo.map(function (peopleVideo) {
            return (
                <div className="people-video-ring" onClick={this.handleClick.bind(this, peopleVideo.index)}>
                    <img src={peopleVideo.img} alt={peopleVideo.title} className="people-video-ring"/>
                    <div className="people-video-ring-info">
                        <h3 className="party-h3">{peopleVideo.title}</h3>
                    </div>
                </div>
            );
        }.bind(this));
        return (
            <div className="party-full-content">
                {jumbotronVideoMap}
                <div className="party-content party-people-ring" styles="margin-left: auto;  margin-right: auto;  padding-left: auto;  padding-right: auto;">
                    {peopleVideoMap}
                </div>
            </div>
        );
    }
});
React.render(
    <FetchData/>,
    document.getElementById('party-action-react')
);
