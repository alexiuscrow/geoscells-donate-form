import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ua',
    supportedLngs: ['ua', 'en'],
    load: 'languageOnly',
    detection: {
      order: ['querystring']
    },
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false
    },
    debug: process.env.NODE_ENV === 'development',
    resources: {
      ua: {
        translation: {
          creditCardDonation: {
            name: {
              label: 'Ваше імʼя',
              inputPlaceholder: 'Імʼя'
            },
            email: {
              label: 'Ваша електронна пошта',
              inputPlaceholder: 'Електронна пошта'
            },
            amount: {
              label: 'Скільки ви хочете пожертвувати?',
              inputPlaceholder: 'Розмір пожертви'
            },
            cardNumber: {
              label: 'Номер картки',
              inputPlaceholder: 'XXXX XXXX XXXX XXXX'
            },
            expiryDate: {
              label: 'Термін придатності',
              inputPlaceholder: 'MM / РР'
            },
            cvc: {
              label: 'Код безпеки',
              inputPlaceholder: 'XXX'
            },
            currencySign: '$',
            donateButton: 'Підтримати',
            loadingButton: 'Обробка',
            loadingTitle: 'Обробка платежу...'
          },
          validationMessages: {
            tooShort: 'Закоротке значення',
            tooLong: 'Завелике значення',
            required: 'Це поле є обовʼязковим',
            positive: 'Значення повинно бути додатнім',
            invalidEmail: 'Недійсний email',
            paymentInputs: {
              emptyCardNumber: 'Це поле є обовʼязковим',
              invalidCardNumber: 'Недійсний номер картки',
              emptyExpiryDate: 'Це поле є обовʼязковим',
              monthOutOfRange: 'Місяць закінчення має бути між 01 і 12',
              yearOutOfRange: 'Рік закінчення терміну дії не може бути в минулому',
              dateOutOfRange: 'Дата закінчення терміну дії не може бути в минулому',
              invalidExpiryDate: 'Дата закінчення терміну дії недійсна',
              emptyCVC: 'Це поле є обовʼязковим',
              invalidCVC: 'Недійсний rод безпеки'
            }
          },
          googlePay: {
            totalPriceLabel: 'Разом'
          },
          paymentResult: {
            paymentIdTitle: 'Ідентифікатор платежу:',
            success: {
              title: 'Платіж надіслано',
              buttonTitle: 'Повернутись до форми'
            },
            error: {
              title: 'Не вдалося здійснити платіж',
              buttonTitle: 'Повернутись до форми'
            }
          }
        }
      },
      en: {
        translation: {
          creditCardDonation: {
            name: {
              label: 'Your name',
              inputPlaceholder: 'Name'
            },
            email: {
              label: 'Your email',
              inputPlaceholder: 'Email'
            },
            amount: {
              label: 'How much do you wish to donate?',
              inputPlaceholder: 'Donation amount'
            },
            cardNumber: {
              label: 'Card number',
              inputPlaceholder: 'XXXX XXXX XXXX XXXX'
            },
            expiryDate: {
              label: 'Expiration date',
              inputPlaceholder: 'MM / YY'
            },
            cvc: {
              label: 'CVC',
              inputPlaceholder: 'XXX'
            },
            currencySign: '$',
            donateButton: 'Donate',
            loadingButton: 'Processing',
            loadingTitle: 'Payment processing...'
          },
          validationMessages: {
            tooShort: 'Too short',
            tooLong: 'Too long',
            required: 'This field is marked as required',
            positive: 'The value should be positive',
            invalidEmail: 'Invalid email',
            paymentInputs: {
              emptyCardNumber: 'This field is marked as required',
              invalidCardNumber: 'Invalid card number',
              emptyExpiryDate: 'This field is marked as required',
              monthOutOfRange: 'The expiration month must be between 01 and 12',
              yearOutOfRange: 'Expiration year cannot be in the past',
              dateOutOfRange: 'The expiration date cannot be in the past',
              invalidExpiryDate: 'The expiration date is invalid',
              emptyCVC: 'This field is marked as required',
              invalidCVC: 'The security code is invalid'
            }
          },
          googlePay: {
            totalPriceLabel: 'Total'
          },
          paymentResult: {
            paymentIdTitle: 'Payment ID:',
            success: {
              title: 'Payment sent',
              buttonTitle: 'Back to form'
            },
            error: {
              title: 'Payment failed',
              buttonTitle: 'Back to form'
            }
          }
        }
      }
    }
  });

export default i18next;
