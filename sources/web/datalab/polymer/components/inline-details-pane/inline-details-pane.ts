/*
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

/**
 * Inline details pane element for Datalab.
 */
@Polymer.decorators.customElement('inline-details-pane')
class InlineDetailsPaneElement extends Polymer.Element {

  /**
   * Currently displayed inline-details pane name.
   */
  @Polymer.decorators.property({type: String})
  public details = '';

  /**
   * File whose details to show.
   */
  @Polymer.decorators.property({type: Object})
  public file: DatalabFile;

  /**
   * Whether the pane is actively tracking selected items. This is used to avoid fetching the
   * selected file's data if the pane is closed by the host element.
   */
  @Polymer.decorators.property({type: Boolean})
  public active = true;

  /**
   * Shows inline details of the selected file for known file types.
   */
  @Polymer.decorators.observe(['active', 'file'])
  _reloadInlineDetails() {
    if (!this.file || !this.active) {
      return;
    }

    this.details = this.file.getInlineDetailsName();
    if (this.details) {
      const elName = this.details + '-inline-details';
      const pageUrl = this.resolveUrl('../' + elName + '/' + elName + '.html');
      Polymer.importHref(pageUrl, undefined, undefined, true);
    }
  }

  show() {
    if (this.details) {
      const elementId = this.details + '-inline-details';
      const element = this.$[elementId];
      if (element && element.show) {
        element.show();
      }
    }
  }
}
