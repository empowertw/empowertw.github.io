/**
 * Created by lololol on 3/Apr/15.
 */

var AliasMemberFullNotAgree = React.createClass({
    render: function() {
        return (
            <div className={this.props.classWithDisplay}>
                <div className="alias-image-background">
                    <img src={this.props.src} alt="" className="alias-image-photo"/>
                </div>
                <img src={this.props.partySrc} alt="" className="alias-image-party"/>
                <h3 className={this.props.nameClass}>{this.props.name}</h3>
            </div>
        );
    }
});
var AliasMemberFullAgree = React.createClass({
    render: function() {
        return (
            <div>
                <label htmlFor={this.props.name+"立委訴求承諾書"}>
                    <div className="alias-clickable-div">
                        <div className={this.props.classWithDisplay} title={this.props.name+"立委訴求承諾書"}>
                            <div className="alias-image-background">
                                <img src={this.props.src} alt="" className="alias-image-photo"/>
                            </div>
                            <img src={this.props.partySrc} alt="" className="alias-image-party"/>
                            <h3 className={this.props.nameClass}>{this.props.name}</h3>
                        </div>
                    </div>
                </label>
                <input className="modal-state" id={this.props.name+"立委訴求承諾書"} type="checkbox" />
                <div className="modal">
                    <label className="modal__bg" htmlFor={this.props.name+"立委訴求承諾書"}></label>
                    <div className="modal__inner">
                        <label className="modal__close" htmlFor={this.props.name+"立委訴求承諾書"}></label>
                        <h2 >{this.props.agreeTitle}</h2>
                        <p><img src={this.props.agreeImgAddress} className="party-agree-img" alt="" /></p>
                    </div>
                </div>
            </div>

        );
    }
});
//    <div id={this.props.id} className="dialog" title={this.props.name + " 立委承諾書"}><img src={"https://ef759e7ab8ebacebb837df58b36f0346a93140e2-www.googledrive.com/host/0B3zZU8B9RCrhY0RlbzdKUldTQXM/" + this.props.name + "承諾書.jpg"} alt=""/></div>
var FetchData = React.createClass({
    handleClick: function(agreeOrLocation, value) {
        console.log(agreeOrLocation);
        console.log(value);
        if (agreeOrLocation.localeCompare("agree") == 0) {
            $.cookie("agree", value);
        } else {
            $.cookie("location", value);
        }
        this.loadCommentsFromServer();
    },
    loadCommentsFromServer: function() {
        var b = [
            {"classString":"party-sidebar-button-normal", "value":"已表態", "category":"agree", "compare":"1"},
            {"classString":"party-sidebar-button-normal", "value":"未表態", "category":"agree", "compare":"0"},
            {"classString":"party-sidebar-button-normal", "value":"全國", "category":"location", "compare":"全國"},
            {"classString":"party-sidebar-button-normal", "value":"台北市", "category":"location", "compare":"台北市"},
            {"classString":"party-sidebar-button-normal", "value":"新北市", "category":"location", "compare":"新北市"},
            {"classString":"party-sidebar-button-normal", "value":"台中市", "category":"location", "compare":"台中市"},
            {"classString":"party-sidebar-button-normal", "value":"台南市", "category":"location", "compare":"台南市"},
            {"classString":"party-sidebar-button-normal", "value":"高雄市", "category":"location", "compare":"高雄市"},
            {"classString":"party-sidebar-button-normal", "value":"桃園縣", "category":"location", "compare":"桃園縣"},
            {"classString":"party-sidebar-button-normal", "value":"新竹市", "category":"location", "compare":"新竹市"},
            {"classString":"party-sidebar-button-normal", "value":"新竹縣", "category":"location", "compare":"新竹縣"},
            {"classString":"party-sidebar-button-normal", "value":"苗栗縣", "category":"location", "compare":"苗栗縣"},
            {"classString":"party-sidebar-button-normal", "value":"彰化縣", "category":"location", "compare":"彰化縣"},
            {"classString":"party-sidebar-button-normal", "value":"雲林縣", "category":"location", "compare":"雲林縣"},
            {"classString":"party-sidebar-button-normal", "value":"嘉義市", "category":"location", "compare":"嘉義市"},
            {"classString":"party-sidebar-button-normal", "value":"嘉義縣", "category":"location", "compare":"嘉義縣"},
            {"classString":"party-sidebar-button-normal", "value":"屏東縣", "category":"location", "compare":"屏東縣"},
            {"classString":"party-sidebar-button-normal", "value":"南投縣", "category":"location", "compare":"南投縣"},
            {"classString":"party-sidebar-button-normal", "value":"宜蘭縣", "category":"location", "compare":"宜蘭縣"},
            {"classString":"party-sidebar-button-normal", "value":"花蓮縣", "category":"location", "compare":"花蓮縣"},
            {"classString":"party-sidebar-button-normal", "value":"台東縣", "category":"location", "compare":"台東縣"},
            {"classString":"party-sidebar-button-normal", "value":"澎湖縣", "category":"location", "compare":"澎湖縣"},
            {"classString":"party-sidebar-button-normal", "value":"金門縣", "category":"location", "compare":"金門縣"},
            {"classString":"party-sidebar-button-normal", "value":"連江縣", "category":"location", "compare":"連江縣"},
            {"classString":"party-sidebar-button-normal", "value":"不分區", "category":"location", "compare":"不分區"},
            {"classString":"party-sidebar-button-origin", "value":"山地原住民", "category":"location", "compare":"山地原住民"},
            {"classString":"party-sidebar-button-origin", "value":"平地原住民", "category":"location", "compare":"平地原住民"},
            {"classString":"party-sidebar-button-foreign", "value":"僑居國外國民", "category":"location", "compare":"僑居國外國民"}
        ];
        var agree = $.cookie('agree');
        var location = $.cookie('location');

        // 當cookie不存在時進行初始化
        if (location == null) {
            $.cookie("location", "全國");
            location = "全國";
        }
        if (agree == null) {
            $.cookie("agree", "0");
            agree = "0";
        }
        if (agree.localeCompare("1") == 0) {
            b[0].value = "→" + b[0].value;
            b[0].classString += " party-sidebar-button-unselected";
            b[1].classString += " party-sidebar-button-selected";
        } else {
            b[0].classString += " party-sidebar-button-selected";
            b[1].value = "→" + b[1].value;
            b[1].classString += " party-sidebar-button-unselected";
        }
        for (var i = 2; i < b.length; i++) {
            if (b[i].compare.localeCompare(location) == 0) {
                b[i].value = "→" + b[i].value;
                b[i].classString += " party-sidebar-button-unselected";
            } else {
                b[i].classString += " party-sidebar-button-selected";
            }
        }
        var sum = 0;
        var total = 0;

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(d) {
                $.each(d, function(i) {
                    d[i].src = "https://ef759e7ab8ebacebb837df58b36f0346a93140e2-www.googledrive.com/host/0B3zZU8B9RCrhY0RlbzdKUldTQXM/" + d[i].name + ".png";
                    d[i].partySrc = "../images/" + d[i].party + ".svg";
                    if (d[i].name.localeCompare("鄭天財Sra．Kacaw") == 0) {
                        d[i].nameClass = "alias-image-name-chen";
                    } else if (d[i].name.localeCompare("高金素梅") == 0) {
                        d[i].nameClass = "alias-image-name-kao";
                    } else {
                        d[i].nameClass = "alias-image-name";
                    }
                    if (d[i].location.localeCompare(location) == 0 && d[i].agree.localeCompare(agree) == 0) {
                        d[i].classWithDisplay = "alias-member-full";
                    } else if (location.localeCompare("全國") == 0 && d[i].agree.localeCompare(agree) == 0) {
                        d[i].classWithDisplay = "alias-member-full";
                    } else {
                        d[i].classWithDisplay = "alias-member-full-none";
                    }
                    if (d[i].location.localeCompare(location) == 0) {
                        total = total + 1;
                        if (d[i].agree.localeCompare("1") == 0 || d[i].party.localeCompare("民主進步黨") == 0 || d[i].party.localeCompare("台灣團結聯盟") == 0) {
                            sum = sum + 1;
                        }
                    } else if (location.localeCompare("全國") == 0) {
                        total = total + 1;
                        if (d[i].agree.localeCompare("1") == 0 || d[i].party.localeCompare("民主進步黨") == 0 || d[i].party.localeCompare("台灣團結聯盟") == 0) {
                            sum = sum + 1;
                        }
                    }
                });
                this.setState({d: d, sum: sum, total: total, b: b});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {d: [], sum: 0, total: 0, b: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
    },
    render: function() {
        var aliasMemberFullMap = this.state.d.map(function (d) {
            var AliasMemberFull;
            if (d.agree.localeCompare("1") === 0 || d.party.localeCompare("民主進步黨") == 0 || d.party.localeCompare("台灣團結聯盟") == 0) {
                AliasMemberFull = AliasMemberFullAgree;
                if (d.party.localeCompare("民主進步黨") == 0) {
                    d.agreeImgAddress = "https://ef759e7ab8ebacebb837df58b36f0346a93140e2-www.googledrive.com/host/0B3zZU8B9RCrhY0RlbzdKUldTQXM/民進黨團承諾書.jpg";
                    d.agreeTitle = d.name + " 立委所屬黨團承諾書";
                } else {
                    d.agreeImgAddress = "https://ef759e7ab8ebacebb837df58b36f0346a93140e2-www.googledrive.com/host/0B3zZU8B9RCrhY0RlbzdKUldTQXM/" + d.name + "承諾書.jpg";
                    d.agreeTitle = d.name + " 立委承諾書";
                }
            } else {
                AliasMemberFull = AliasMemberFullNotAgree;
            }
            return (
                <AliasMemberFull name={d.name} agree={d.agree} party={d.party} id={d.id} location={d.location} src={d.src} partySrc={d.partySrc} nameClass={d.nameClass} classWithDisplay={d.classWithDisplay} agreeTitle={d.agreeTitle} agreeImgAddress={d.agreeImgAddress}/>
            );
        });
        var partySidebarButtonMap = this.state.b.map(function (b) {
            return (
                <input className={b.classString} type="button" value={b.value}  onClick={this.handleClick.bind(this, b.category, b.compare)} />
            );
        }.bind(this));
        console.log(this.state.b);
        if ($.cookie('agree') === "1") {
            return (
                <div>
                    <div className="party-sidebar">
                        <div>
                            <h1 className="party-sidebar-h1">立委表態牆</h1>
                            <h3 className="party-sidebar-h3">最新表態率：{this.state.sum}/{this.state.total}</h3>
        {partySidebarButtonMap}
                        </div>
                    </div>
                    <div className="party-content">
                        <h1 className="party-content-hint-for-click">☆點擊立委框框可閱讀立委訴求承諾書</h1>
        {aliasMemberFullMap}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="party-sidebar">
                        <div>
                            <h1 className="party-sidebar-h1">立委表態牆</h1>
                            <h3 className="party-sidebar-h3">最新表態率：{this.state.sum}/{this.state.total}</h3>
        {partySidebarButtonMap}
                        </div>
                    </div>
                    <div className="party-content">
        {aliasMemberFullMap}
                    </div>
                </div>
            );
        }
    }
});
React.render(
    <FetchData url="../scripts/congressmember.json"/>,
    document.getElementById('party-full-content')
);
