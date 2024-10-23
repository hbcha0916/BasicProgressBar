var basicProgressBar = {
    percentage: 0,
    selectId: null,
    type: "Circle",
    bar: null,

    superinit: function (pgBarObjID, customConfig = {conf:{}, font: {}}, type = "Circle"){
        // customConfig = {conf:{...}, font:{...}}
        // type = "Circle" or "SemiCircle"
        this.type = type
        $.extend(true,this.conf,customConfig.conf);
        $.extend(true,this.font,customConfig.font);
        this.selectId = "#"+pgBarObjID
    },

    setCurrentValue: function(maxValue, currentValue){
        this.maxValue = maxValue;
        this.currentValue = currentValue;
        this.percentage = currentValue / maxValue
        this.setProgressBarOpts();
    },

    conf: {
        color: "#4287f5", // 프로그래스바 색상
        strokeWidth: 8 // 바두께
    },

    font: {
        fontSize : "1.2em",
        fontWeight : "bold"
    },

    setProgressBarOpts: function(){
        var maxValue = this.maxValue
        var text = {
            autoStyleContainer: false,
            alignToBottom: false
        }
        if(this.type === "SemiCircle"){
            text = {
                value: '',
                alignToBottom: false
            }
        }
        if(this.bar == null){
            
            this.bar = new ProgressBar[this.type](this.selectId,{
                color: this.conf.color,
                strokeWidth: this.conf.strokeWidth,
                trailWidth: 1,
                easing: 'easeInOut',
                duration: 1400,
                text: text,
                from: { color: this.conf.color, width: this.conf.strokeWidth },
                to: { color: this.conf.color, width: this.conf.strokeWidth },
                step: function(state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);
                    var value = Math.round(circle.value() * maxValue);
                    if (value === 0) {
                        circle.setText('');
                    } else {
                        circle.setText(value); //수치값
                    }

                }
            });
            this.bar.text.style.fontSize = this.font.fontSize;
            this.bar.text.style.fontWeight = this.font.fontWeight;
            
        }
        
    },

    draw: function(){
        this.bar.animate(this.percentage);
    }
}