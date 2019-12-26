import { message } from 'antd';

export function copy2ClipBoard(str: string) {
  var tempInput = document.createElement('textarea');
  tempInput.value = str;
  document.body.appendChild(tempInput);
  tempInput.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  tempInput.style.display = 'none';
  message.success('已将内容复制到剪贴版');
}