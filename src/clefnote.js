// Vex Flow Notation
// Copyright Mohit Muthanna 2010
//
// Author Taehoon Moon 2014

/** @constructor */
Vex.Flow.ClefNote = (function() {
  function ClefNote(clef, size, annotation) { this.init(clef, size, annotation); }

  Vex.Inherit(ClefNote, Vex.Flow.Note, {
    init: function(clef, size, annotation) {
      ClefNote.superclass.init.call(this, {duration: "b"});
      
      this.setClef(clef, size, annotation);

      // Note properties
      this.ignore_ticks = true;
    },

    setClef: function(clef, size, annotation) {
      this.clef_obj = new Vex.Flow.Clef(clef, size, annotation);
      this.clef = this.clef_obj.clef;
      this.glyph = new Vex.Flow.Glyph(this.clef.code, this.clef.point);
      this.setWidth(this.glyph.getMetrics().width);
      return this;
    },

    getClef: function() {
      return this.clef;
    },

    setStave: function(stave) {
      var superclass = Vex.Flow.ClefNote.superclass;
      superclass.setStave.call(this, stave);
    },

    getBoundingBox: function() {
      return new Vex.Flow.BoundingBox(0, 0, 0, 0);
    },

    addToModifierContext: function() {
      /* overridden to ignore */
      return this;
    },

    preFormat: function() {
      this.setPreFormatted(true);
      return this;
    },

    draw: function() {
      if (!this.stave) throw new Vex.RERR("NoStave", "Can't draw without a stave.");
      
      if (!this.glyph.getContext()) {
        this.glyph.setContext(this.context);
      }

      this.glyph.setStave(this.stave);
      this.glyph.setYShift(
        this.stave.getYForLine(this.clef.line) - this.stave.getYForGlyphs());
      this.glyph.renderToStave(this.getAbsoluteX());
    }
  });

  return ClefNote;
}());
