/* eslint-disable jsx-a11y/img-redundant-alt */
import { ChevronDownIcon, GlobeAltIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Popover from '../Popover/Popover'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'

type FormData = Pick<Schema, 'name'>

const nameShema = schema.pick(['name'])

export default function Header() {
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameShema)
  })
  const navigate = useNavigate()
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-2 text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            className='flex cursor-pointer items-center py-1 hover:text-gray-300'
            renderPopover={
              <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                <div className='flex flex-col py-2 pr-32 pl-3'>
                  <button className='border-none bg-white py-2 px-3 text-left hover:text-orange'>Tiếng Việt</button>
                  <button className='mt-2 border-none bg-white py-2 px-3 text-left hover:text-orange'>English</button>
                </div>
              </div>
            }
          >
            <GlobeAltIcon className='w-5' />
            <span className='mx-1'>Tiếng Việt</span>
            <ChevronDownIcon className='h-5 w-5' />
          </Popover>
          {isAuthenticated && (
            <Popover
              className='ml-6 flex cursor-pointer  items-center py-1 hover:text-gray-300'
              renderPopover={
                <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                  <Link
                    to={path.profile}
                    className='ư-full block bg-white py-2 px-4 text-left text-black hover:bg-slate-100 hover:text-cyan-500'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to={path.home}
                    className='ư-full block bg-white py-2 px-4 text-left text-black hover:bg-slate-100 hover:text-cyan-500'
                  >
                    Đơn mua
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='ư-full block bg-white py-2 px-4 text-left text-black hover:bg-slate-100 hover:text-cyan-500'
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className='mr-2 h-6 w-6 flex-shrink-0'>
                <img
                  src='https://i.pinimg.com/564x/56/3f/90/563f90e42422a6e307b161221e5636ba.jpg'
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <div>{profile?.email}</div>
            </Popover>
          )}

          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to={path.register} className='mx-3 capitalize text-white hover:text-white/70'>
                Đăng ký
              </Link>
              <div className='h-4 border-r-[1px] border-r-white/40'></div>
              <Link to={path.login} className='mx-3 capitalize text-white hover:text-white/70'>
                Đăng Nhập
              </Link>
            </div>
          )}
        </div>
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <Link to={path.home} className='col-span-2'>
            <svg className='h-11 fill-white' enableBackground='0 0 889 281' viewBox='0 0 889 281'>
              <path d='M162.9159,199.1383 C165.4579,178.3093 152.0399,165.0233 116.6229,153.7203 C99.4679,147.8673 91.3869,140.2033 91.5759,129.6373 C92.2919,117.9403 103.1909,109.4093 117.6449,109.1243 C127.6629,109.3243 138.7909,111.7713 149.6119,118.9903 C150.8979,119.8003 151.8029,119.6733 152.5339,118.5673 C153.5359,116.9553 156.0219,113.0863 156.8579,111.6993 C157.4239,110.7933 157.5339,109.6233 156.1009,108.5793 C154.0499,107.0573 148.2969,103.9763 145.2089,102.6843 C136.8169,99.1713 127.3989,96.9593 117.3559,96.9793 C96.1979,97.0683 79.5249,110.4533 78.1339,128.3153 C77.2239,141.2043 83.6049,151.6743 97.3059,159.6563 C100.2089,161.3483 115.9269,167.5993 122.1779,169.5453 C141.8439,175.6683 152.0549,186.6443 149.6519,199.4413 C147.4709,211.0523 135.2549,218.5503 118.4169,218.7783 C105.0659,218.2693 93.0519,212.8273 83.7359,205.5813 C83.4999,205.4053 82.3299,204.4983 82.1709,204.3763 C81.0189,203.4743 79.7619,203.5333 78.9969,204.7003 C78.4299,205.5583 74.8299,210.7583 73.9209,212.1233 C73.0669,213.3253 73.5239,213.9863 74.4109,214.7233 C78.3039,217.9683 83.4679,221.5173 86.9899,223.3133 C96.6659,228.2463 107.1689,230.9503 118.3429,231.3743 C125.5279,231.8613 134.5919,230.3173 141.3539,227.4473 C153.5019,222.2913 161.3469,211.9923 162.9159,199.1383 Z M119.2109,15.5363 C96.2859,15.5363 77.5989,37.1433 76.7239,64.1893 L161.6979,64.1893 C160.8229,37.1433 142.1359,15.5363 119.2109,15.5363 Z M206.2459,266.0383 L205.3689,266.0453 L30.3869,266.0193 L30.3829,266.0193 C18.4809,265.5743 9.7289,255.9273 8.5349,243.9503 L8.4179,241.7923 L0.5939,69.6693 L0.5949,69.6683 C0.5839,69.5383 0.5799,69.4073 0.5799,69.2743 C0.5799,66.4973 2.8059,64.2403 5.5709,64.1903 L5.5709,64.1893 L60.7269,64.1893 C62.0789,28.4773 87.7459,0.0013 119.2109,0.0013 C150.6759,0.0013 176.3429,28.4773 177.6949,64.1893 L232.6929,64.1893 L232.7709,64.1893 C235.5809,64.1893 237.8569,66.4653 237.8569,69.2743 C237.8569,69.3623 237.8549,69.4493 237.8509,69.5363 L237.8509,69.5393 L229.2779,242.3403 L229.1999,243.8033 C228.1639,255.9293 218.3549,265.7103 206.2459,266.0383 Z M332.3783,151.3829 C370.0613,162.6609 384.8853,176.7679 382.5153,199.4149 C381.0553,213.3669 372.7123,224.7019 359.6363,230.5089 C352.4283,233.7099 342.7733,235.5289 335.0703,235.1429 C323.2133,234.9009 312.0043,232.2319 301.6283,227.1789 C297.8793,225.3549 292.3553,221.7299 288.0573,218.2819 L288.0423,218.2679 C286.0333,216.5779 285.7943,215.4789 287.1683,213.4409 C287.5243,212.8879 288.1743,211.9019 289.6783,209.6339 C290.9693,207.6879 292.2573,205.7309 292.3203,205.6349 C293.9283,203.2079 295.6273,203.2079 297.9713,204.8189 C297.9873,204.8309 298.1993,204.9879 298.8023,205.4359 C299.2813,205.7909 299.5763,206.0099 299.6303,206.0489 C310.2993,214.0319 322.6203,218.5309 334.9013,218.7849 C351.7083,218.2659 363.5593,210.7209 365.4653,199.5239 C367.5613,187.2079 357.3853,176.6499 337.5093,170.8539 C330.5543,168.8259 315.3603,163.1299 311.1193,160.9009 C296.2103,152.5789 289.0223,141.2679 289.7703,127.1949 C290.9493,107.7119 308.8043,92.9199 331.6063,92.4269 C341.6273,92.2329 351.6563,94.1189 361.3183,97.9569 C364.8013,99.3409 370.9023,102.4969 373.1033,104.0659 C375.6603,105.8719 375.6603,107.1179 374.4143,109.4519 C374.2383,109.7559 373.5743,110.7169 371.8523,113.1789 L371.8463,113.1869 C370.0293,115.7849 369.4843,116.5699 369.3243,116.8359 C367.8293,118.7729 366.5753,119.3709 364.0163,117.8259 C353.9543,111.3789 343.7523,108.3369 332.2193,108.3079 C318.0053,108.8359 307.5653,117.2619 307.0643,128.4369 C307.0683,138.5059 315.0483,145.8189 332.3783,151.3829 Z M438.08,145.7359 C461.069,145.7359 480.053,164.2959 480.139,187.0379 L480.139,231.4649 C480.139,234.0289 479.481,234.6329 476.964,234.6329 L466.402,234.6329 C463.86,234.6329 463.227,234.0289 463.227,231.4649 L463.227,187.1699 C463.17,173.4559 451.93,162.3609 438.08,162.3609 C424.264,162.3609 413.039,173.4039 412.932,187.0729 L412.932,231.4649 C412.932,233.6719 412.064,234.6339 409.758,234.6339 L399.171,234.6339 C396.654,234.6339 395.997,233.7019 395.997,231.4649 L395.997,95.5449 C395.997,93.2119 396.654,92.3769 399.171,92.3769 L409.758,92.3769 C412.027,92.3769 412.932,93.2569 412.932,95.5449 L412.932,154.0389 C420.164,148.6909 428.936,145.7359 438.08,145.7359 Z M539.0868,218.6231 C555.0018,218.6231 567.8978,205.9861 567.8978,190.4041 C567.8978,174.8221 555.0008,162.1851 539.0868,162.1851 C523.1708,162.1851 510.2748,174.8221 510.2748,190.4041 C510.2748,205.9861 523.1708,218.6231 539.0868,218.6231 Z M539.0958,145.8281 C564.2228,145.8281 584.5958,165.7911 584.5958,190.4261 C584.5958,215.0601 564.2228,235.0241 539.0958,235.0241 C513.9688,235.0241 493.5938,215.0601 493.5938,190.4261 C493.5938,165.7911 513.9678,145.8281 539.0958,145.8281 Z M820.2079,180.0728 L870.6129,180.0728 C866.9879,169.7868 856.4429,162.0988 845.1869,162.0988 C833.5149,162.0988 823.5149,169.2838 820.2079,180.0728 Z M883.1149,196.4258 C883.0399,196.4258 882.9649,196.4238 882.9139,196.4218 L819.1719,196.4218 C820.7889,204.6078 826.4109,211.5788 834.1869,215.4788 C836.1999,216.4408 838.3939,217.2398 840.7349,217.8688 C852.1229,220.2518 865.1949,218.5158 875.1579,209.6658 C875.3009,209.5088 875.5709,209.3388 875.8629,209.0818 C877.5319,207.6088 878.7069,207.9818 880.0159,209.6158 C880.0159,209.6158 881.8869,212.2158 885.2289,217.5348 C886.6679,219.7778 886.5619,220.8558 884.1499,223.3418 C884.0509,223.4418 883.8619,223.6188 883.5839,223.8638 C883.1259,224.2658 882.5789,224.7128 881.9429,225.1938 C880.1309,226.5588 877.9629,227.9238 875.4379,229.1948 C866.1049,233.8958 854.6019,236.1088 840.9299,234.4628 C840.4759,234.3938 840.1139,234.3368 839.7629,234.2778 L839.7629,234.3018 L838.9849,234.1568 C828.9919,232.2948 820.0159,227.3148 813.4119,220.0458 C813.3759,220.0088 813.3739,220.0068 813.3649,219.9948 C807.4399,213.4648 803.6289,205.3378 802.4359,196.4218 L802.4259,196.4218 L802.3559,195.8418 C802.1429,194.0268 802.0339,192.1968 802.0339,190.3568 C802.0339,165.7308 821.3439,145.7588 845.1739,145.7588 C869.0059,145.7588 888.3139,165.7298 888.3139,190.3568 C888.3139,190.5468 888.3129,190.6338 888.3119,190.6858 C888.3199,190.8038 888.3239,190.9258 888.3239,191.0608 C888.3239,193.9288 886.1299,196.2948 883.3479,196.4208 C883.2669,196.4238 883.1909,196.4258 883.1149,196.4258 Z M643.3036,218.3922 C658.9296,218.3922 671.5976,205.7582 671.5976,190.1732 C671.5976,174.5892 658.9296,161.9542 643.3036,161.9542 C627.9436,161.9542 615.3986,174.1772 615.0176,189.4412 L615.0176,190.8962 C615.4026,206.1742 627.9466,218.3922 643.3036,218.3922 Z M643.3116,145.5972 C668.0056,145.5972 688.0256,165.5642 688.0256,190.1952 C688.0256,214.8272 668.0056,234.7952 643.3116,234.7952 C632.8436,234.7952 622.9336,231.1922 615.0176,224.7302 L615.0176,277.0922 C615.0176,279.4422 614.3606,280.2592 611.8426,280.2592 L601.7726,280.2592 C599.2546,280.2592 598.5976,279.4232 598.5976,277.0922 L598.5976,148.7642 C598.5976,146.3022 599.2546,145.5972 601.7726,145.5972 L611.8426,145.5972 C614.3606,145.5972 615.0176,146.3662 615.0176,148.7642 L615.0176,155.6602 C622.9336,149.1992 632.8436,145.5972 643.3116,145.5972 Z M720.33,180.0728 L770.735,180.0728 C767.111,169.7868 756.566,162.0988 745.309,162.0988 C733.638,162.0988 723.638,169.2838 720.33,180.0728 Z M788.436,190.3568 C788.436,190.5468 788.436,190.6338 788.434,190.6858 C788.443,190.8038 788.446,190.9258 788.446,191.0608 C788.446,193.9288 786.252,196.2948 783.471,196.4208 C783.39,196.4238 783.314,196.4258 783.237,196.4258 C783.162,196.4258 783.087,196.4238 783.036,196.4218 L719.294,196.4218 C720.911,204.6078 726.534,211.5788 734.309,215.4788 C736.323,216.4408 738.517,217.2398 740.858,217.8688 C752.246,220.2518 765.317,218.5158 775.28,209.6658 C775.423,209.5088 775.693,209.3388 775.985,209.0818 C777.654,207.6088 778.83,207.9818 780.139,209.6158 C780.139,209.6158 782.01,212.2158 785.351,217.5348 C786.79,219.7778 786.684,220.8558 784.273,223.3418 C784.174,223.4418 783.985,223.6188 783.707,223.8638 C783.249,224.2658 782.701,224.7128 782.065,225.1938 C780.254,226.5588 778.086,227.9238 775.56,229.1948 C766.228,233.8958 754.725,236.1088 741.053,234.4628 C740.599,234.3938 740.236,234.3368 739.886,234.2778 L739.886,234.3018 L739.108,234.1568 C729.115,232.2948 720.138,227.3148 713.534,220.0458 C713.499,220.0088 713.497,220.0068 713.487,219.9948 C707.563,213.4648 703.751,205.3378 702.559,196.4218 L702.548,196.4218 L702.479,195.8418 C702.265,194.0268 702.156,192.1968 702.156,190.3568 C702.156,165.7308 721.467,145.7588 745.297,145.7588 C769.128,145.7588 788.436,165.7298 788.436,190.3568 Z' />
            </svg>
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                placeholder='Free Ship Đơn Từ 0Đ'
                className='flex-grow border-none px-3 py-2 text-black outline-none'
                {...register('name')}
              />
              <button className='flex-shrink-0 rounded-sm bg-orange py-2 px-6 hover:opacity-90'>
                <MagnifyingGlassIcon className='w-5' />
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-end'>
            <Popover
              placement='bottom-start'
              renderPopover={
                <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  <div className='p-2'>
                    <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                    <div className='mt-5'>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/49b1feb0686efc81b70cbc018de6e12e_xhdpi'
                            className='h-11 w-11 object-cover'
                            alt='Image'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>Bộ nooi Inox 3 ui ren mớ đồ luôn kinh ri bây</div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>đ469.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/49b1feb0686efc81b70cbc018de6e12e_xhdpi'
                            className='h-11 w-11 object-cover'
                            alt='Image'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>Bộ nooi Inox 3 ui ren mớ đồ luôn kinh ri bây</div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>đ469.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/49b1feb0686efc81b70cbc018de6e12e_xhdpi'
                            className='h-11 w-11 object-cover'
                            alt='Image'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>Bộ nooi Inox 3 ui ren mớ đồ luôn kinh ri bây</div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>đ469.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/49b1feb0686efc81b70cbc018de6e12e_xhdpi'
                            className='h-11 w-11 object-cover'
                            alt='Image'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>Bộ nooi Inox 3 ui ren mớ đồ luôn kinh ri bây</div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>đ469.000</span>
                        </div>
                      </div>
                    </div>
                    <div className='mt-6 flex items-center justify-between'>
                      <div className='text-xs capitalize text-gray-600'>Thêm hàng vào giỏ</div>
                      <div className='button hover:bg-orange-90 rounded-sm bg-orange px-4 py-2 capitalize text-white'>
                        Xem giỏ hàng
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to='/'>
                <ShoppingCartIcon className='w-8 text-white' />
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}