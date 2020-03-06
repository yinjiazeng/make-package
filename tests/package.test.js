const { set, del } = require('../lib/utils/package');

describe('设置package字段', () => {
  it('单个字段', () => {
    expect(set({}, 'author', 'aniu')).toEqual({ author: 'aniu' });
  });

  it('嵌套字段', () => {
    expect(set({}, 'repository.type', 'git')).toEqual({ repository: { type: 'git' } });
    expect(set({}, 'repository.type.github', 'git')).toEqual({ repository: { type: { github: 'git' } } });
  });

  it('嵌套字段数组', () => {
    expect(set({}, 'keywords.0', 'pkg')).toEqual({ keywords: ['pkg'] });
    expect(set({}, 'keywords.0.0', 'pkg')).toEqual({ keywords: [ ['pkg'] ] });
  });

  it('数组对象混合嵌套字段', () => {
    expect(set({}, 'keywords.0.name', 'pkg')).toEqual({ keywords: [{ name: 'pkg' }] });
    expect(set({}, 'keywords.0.name.0.0', 'pkg')).toEqual({ keywords: [{ name: [ ['pkg'] ] }] });
  });

  it('字段覆盖', () => {
    expect(set({ author: 'aniu' }, 'author', 'yinjiazeng')).toEqual({ author: 'yinjiazeng' });
    expect(set({ keywords: ['a', 'b'] }, 'keywords.1', 'pkg')).toEqual({ keywords: ['a', 'pkg'] });
  });

  it('字段合并', () => {
    expect(set({ author: 'aniu' }, 'keywords', ['pkg'])).toEqual({ author: 'aniu', keywords: ['pkg'] });
    expect(set({ repository: { type: 'git' }}, 'repository.url', 'url')).toEqual({ repository: { type: 'git', url: 'url' } });
  });
});

describe('删除package字段', () => {
  it('单个字段', () => {
    expect(del({ author: 'aniu' }, 'author')).toEqual({});
    expect(del({ author: 'aniu', keywords: ['pkg'] }, 'author')).toEqual({ keywords: ['pkg'] });
  });

  it('嵌套字段', () => {
    expect(del({ repository: { type: 'git', url: 'url' } }, 'repository.type')).toEqual({ repository: { url: 'url' } });
  });

  it('嵌套字段数组', () => {
    expect(del({ keywords: ['pkg', 'mpkg'] }, 'keywords.0')).toEqual({ keywords: ['mpkg'] });
    expect(del({ keywords: ['pkg', 'mpkg'] }, 'keywords.1')).toEqual({ keywords: ['pkg'] });
    expect(del({ keywords: ['pkg', 'mpkg', [ 'pkg' ]] }, 'keywords.2.0')).toEqual({ keywords: ['pkg', 'mpkg', []] });
  });

  it('数组对象混合嵌套字段', () => {
    expect(del({ author: [{ email: 'x@y.z' }] }, 'author.0.email')).toEqual({ author: [{}] });
  });
});
