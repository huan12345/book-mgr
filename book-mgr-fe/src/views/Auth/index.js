import { defineComponent } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue'/* 图标 */
import { LockOutlined } from '@ant-design/icons-vue'
import { KeyOutlined } from '@ant-design/icons-vue'
import { MailOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    components: {
        UserOutlined,/* 用户图标 */
        LockOutlined,/* 锁 */
        KeyOutlined,/* 钥匙 */
        MailOutlined,/* 邀请码 */
    },
    setup() {
        
    },
});