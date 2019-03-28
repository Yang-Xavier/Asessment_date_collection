import BaseNode from './BaseNode'
import {mount} from './node_util'

class HomePageBased extends BaseNode{
    constructor(param) {
        super(param)
        this.set_state({mounted: false})
    }

    mount_content(content_node) {
        if (this.content_block) {
            mount(content_node, this.content_block)
        }
    }
}

export default HomePageBased;