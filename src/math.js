MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  var TeX = MathJax.Extension.Arabic.TeX;
  var Text = MathJax.Extension.Arabic.Text;

  MathJax.Hub.CombineConfig("Arabic", {
      identifiersMap: {
        // Math functions
        'sin': 'جا',
        'cos': 'جتا',
        'tan': 'ظا',
        'log': 'لو'
      },
      // Limits
      operatorsMap: {
        'lim': 'نهــا'
      }
    });

  MathJax.Extension.Arabic.config = MathJax.Hub.CombineConfig('Arabic', {
    dict: {
      // A macros to force English zero in both languages
      "Zero": ["zero", TeX('0', '\\text{0}')],  // Better localized Zero
      "Radius": ["radius", Text('r', 'نق')],  // Circle radius
      "Area": ["Area", Text('A', 'م')]  // Area of circles and other stuff
    }
  });

  MathJax.Hub.Register.StartupHook('Arabic TeX Ready', function () {
    // By default, a lonely Zero is converted into `صفر`
    var TEX = MathJax.InputJax.TeX;
    var texParseArabicNumber = TEX.Parse.prototype.arabicNumber;

    TEX.Parse.Augment({
      arabicNumber: function (token) {
        var text = token.data[0].data[0];
        if ('0' === text) {
          text = 'صفر';

          token.data[0].data[0] = text;
          token.arabicFontLang = 'ar';

          return this.flipHorizontal(token);
        } else {
          return texParseArabicNumber.call(this, token);
        }
      }
    });
  });
});