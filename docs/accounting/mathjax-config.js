MathJax = {
    tex: {
      packages: ['base', 'upgreek', 'ams'], // Load upgreek package
      macros: {
        E: "\\mathbb{E}",
        rm: "\\mathrm",
      }
    },
    chtml: {
        scale: 1,
        mtextInheritFont: true,
        mtextFont: 'STIX-Web',
        displayAlign: 'left',
        displayIndent: '5em',
    },
    startup: {
      ready() {
        const {CHTMLTextNode} = MathJax._.output.chtml.Wrappers.TextNode;
        const {CHTMLWrappers} = MathJax._.output.chtml.Wrappers_ts;
      
        CHTMLWrappers[CHTMLTextNode.kind] = class extends CHTMLTextNode {
          toCHTML(parent) {
            super.toCHTML(parent);
            if (this.parent.variant === '-explicitFont') {
              const adaptor = this.adaptor;
              const node = adaptor.lastChild(parent);
              if (!adaptor.getStyle(node, 'width')) return;
              const metrics = this.jax.math.metrics;
              const scale = this.parent.getBBox().scale;
              const width = this.getBBox().w * metrics.em * metrics.scale * scale;
              adaptor.setStyle(node, 'width', Math.round(width) + 'px');
            }
          }
        }
        
        MathJax.startup.defaultReady();
      }
    }
  };