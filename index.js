/**
 * Created by cyb on 2018/4/29.
 */

var result = document.getElementById('result');
var pubsub = {};
(function(q){
  var topics = {};  //回调函数存放的数组
  var subUid = -1;

  q.subscribe = function(topic, func){
    if(!topics[topic]){
      topics[topic] = [];
    }

    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  }

  q.unsubscribe = function(token){
    for (var m in topics){
      if(topics.m){
        for(var i=0; i < m.length; i++){
          if(topics[m][i].token === token ){
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
  }

  q.publish = function(topic, args){
    if(!topics[topic]){
      return false;
    }

    var len = topics[topic].length;

    while(len--){
      topics[topic][len].func(topic, args);
    }
    return true;
  }
})(pubsub);


pubsub.subscribe('example', function(topic, args){
  console.log(topic + ' : ' + args);
  result.getElementsByTagName('h1')[0].innerHTML = topic + ' : ' + args;
});

pubsub.publish('example', 'hello world');


var observer = {
  subscribers: [],
  addSubscribe: function(callback){
    this.subscribers[this.subscribers.length] = callback;
  },
  removeSubscriber: function(callback){
    for (var i = 0; i < this.subscribers.length; i++){
      if(this.subsctibers[i] === callback){
          delete(this.subscribers[i]);
      }
    }
  },
  publish: function(args){
    for (var i = 0; i < this.subscribers.length; i++){
      if(typeof this.subscribers[i] === 'function'){
        this.subscribers[i](args);
      }
    }
  },
  make: function(o){
    for (var i in this){
      o[i] = this[i];
      o.subscribers = [];
    }
  }
}

var blogger = {
  recommend: function(id){
    var msg = '推荐的帖子: ' + id;
    this.publish(msg);
  }
}

var user = {
  vote: function(id){
    var msg = '有人投票给了: ' + id;
    this.publish(msg);
  }
}

observer.make(blogger);
observer.make(user);

var tom = {
  read: function(args){
    console.log('Tom see' + args);
    document.getElementsByTagName('h1')[1].innerHTML = 'Tom see ' + args;
  }
}

var mm = {
  show: function(args){
    document.getElementsByTagName('h1')[2].innerHTML = 'Lily see ' + args;
  }
}

observer.addSubscribe(tom.read);
observer.addSubscribe(mm.show);

blogger.addSubscribe(tom.read);
blogger.addSubscribe(mm.show);

blogger.recommend(2);


// observer.publish('hello, chengyubing')


















