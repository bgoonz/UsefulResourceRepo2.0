/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */
import {AbstractCrudObject} from './../abstract-crud-object';

/**
 * AdCreativeObjectStorySpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */
export default class AdCreativeObjectStorySpec extends AbstractCrudObject {
  static get Fields (): Object {
    return Object.freeze({
      instagram_actor_id: 'instagram_actor_id',
      link_data: 'link_data',
      page_id: 'page_id',
      photo_data: 'photo_data',
      template_data: 'template_data',
      text_data: 'text_data',
      video_data: 'video_data',
    });
  }

}
