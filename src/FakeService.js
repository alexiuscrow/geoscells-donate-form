class FakeService {
  static async makeRequest(data, minTimeoutSec = 2, maxTimeoutSec = 3) {
    return new Promise((resolve, reject) => {
      console.log('Processing payment. Data:', data);

      const timeout = Math.floor((Math.random() * (maxTimeoutSec - minTimeoutSec + 1) + minTimeoutSec) * 1000);

      setTimeout(() => {
        const isSuccessfullyHandled = Math.random() >= 0.5;
        const paymentId = Math.floor((Math.random() * (maxTimeoutSec - minTimeoutSec + 1) + minTimeoutSec) * 1000);

        if (isSuccessfullyHandled) {
          resolve({paymentId});
        } else {
          const error = new Error('Payment is failed');
          error.reason = FakeService.#generateRandomErrorReason();
          error.paymentId = paymentId;
          reject(error);
        }
      }, timeout);
    });
  }

  static #generateRandomErrorReason() {
    const isLongReason = Math.random() >= 0.5;

    if (isLongReason) {
      return (
        '400: Detailed reason example with a long msg. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid. ' +
        'Please check the request parameters and try again. The payment request was invalid.'
      );
    } else {
      return '402: Suspicious fraud';
    }
  }
}

export default FakeService;
