import EMPTY_EMAIL_MESSAGE from './sample/empty-email-message';
import ONE_TIME_PASSCODE from './sample/one-time-passcode';
import ORDER_ECOMMERCE from './sample/order-ecommerce';
import POST_METRICS_REPORT from './sample/post-metrics-report';
import RESERVATION_REMINDER from './sample/reservation-reminder';
import RESET_PASSWORD from './sample/reset-password';
import RESPOND_TO_MESSAGE from './sample/respond-to-message';
import SUBSCRIPTION_RECEIPT from './sample/subscription-receipt';
import WELCOME from './sample/welcome';

export default function getConfiguration(template: string) {
  if (template.startsWith('#sample/')) {
    const sampleName = template.replace('#sample/', '');
    // eslint-disable-next-line default-case
    switch (sampleName) {
      case 'welcome':
        return WELCOME;
      case 'one-time-password':
        return ONE_TIME_PASSCODE;
      case 'order-ecomerce':
        return ORDER_ECOMMERCE;
      case 'post-metrics-report':
        return POST_METRICS_REPORT;
      case 'reservation-reminder':
        return RESERVATION_REMINDER;
      case 'reset-password':
        return RESET_PASSWORD;
      case 'respond-to-message':
        return RESPOND_TO_MESSAGE;
      case 'subscription-receipt':
        return SUBSCRIPTION_RECEIPT;
    }
  }

  //   这种方式传入模版 URL+base64 ： /email-builder/#code/ewogICJyb290IjogewogICAgInR5cGU
  if (template.startsWith('#code/')) {
    try {
      const encodedString = template.replace('#code/', '');
      const atobString = (atob((encodedString)));
      // 将 Base64 解码后的字符串转换为 ArrayBuffer
      const charArray = Uint8Array.from(atobString, char => char.charCodeAt(0));
      // 使用 TextDecoder 和 utf-8 编码进行解码
      const decoder = new TextDecoder('utf-8');
      const configurationString = decodeURIComponent(decoder.decode(charArray));

      console.log('🚀 ~ getConfiguration ~ 二次编辑获取到的code:', configurationString);
      return JSON.parse(configurationString);
    } catch {
      console.error('Couldn\'t load configuration from #code/{base64}.');
    }
  }

  return EMPTY_EMAIL_MESSAGE;
}
