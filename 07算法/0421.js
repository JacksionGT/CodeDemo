class Person {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
  // 演讲
  speech() {
    this.score = 0;
  }
  // 抽奖
  lottery() {
    this.score += Math.ceil(12 * Math.random());
  }
}

// 团队
class Group {
  constructor(...names) {
    // 小组成员
    this.members = names.length > 0 ? names.map(i => new Person(i)) : [];
    this.lastSpeechMember = [];
  }
  getMember() {
    if (this.members.length > 0) {
      this.members.forEach(p => this.lastSpeechMember.includes(p) ? p.score = 0 : p.lottery());
      this.members = this.members.sort((p1, p2) => p2.score - p1.score);
      const [top1, top2, top3] = this.members;
      if (top3.score !== top2.score) {
        console.log(`根据抽奖结果，下次演讲嘉宾是:${top1.name},${top2.name}`);
        this.lastSpeechMember = [top1, top2];
        return this.lastSpeechMember;
      }
      else {
        const topScore = this.members[0].score;
        const nextGroup = this.members.filter(p => p.score === topScore).map(p => p.name);
        const [m1, m2] = new Group().getMember();
        console.log(`根据抽奖结果，下次演讲嘉宾是:${m1.name},${m2.name}`);
        this.lastSpeechMember = [m1, m2];
        return this.lastSpeechMember;
      }
    } else {
      console.log('团队无小组成员');
    }
  }
}

new Group('小明', '小红', '亮亮', '玛丽', '胡玉', '吴婷').getMember();