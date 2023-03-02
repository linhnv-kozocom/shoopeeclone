import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

import { sortBy, order as orderConstant } from 'src/constants/product'
import clsx from 'clsx'
import { ProductListConfig } from 'src/types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
import { QueryConfig } from 'src/hooks/useQueryConfig'
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiceSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <div className=' bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={clsx(
              'h-8 rounded-sm bg-orange px-4 text-center text-sm capitalize text-white hover:bg-orange/80',
              {
                'bg-orange text-white hover:bg-orange/80': isActiceSortBy(sortBy.view),
                'bg-white bg-slate-100 text-black': !isActiceSortBy(sortBy.view)
              }
            )}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={clsx(
              'h-8 rounded-sm bg-orange px-4 text-center text-sm capitalize text-white hover:bg-orange/80',
              {
                'bg-orange text-white hover:bg-orange/80': isActiceSortBy(sortBy.createdAt),
                'bg-white bg-slate-100 text-black': !isActiceSortBy(sortBy.createdAt)
              }
            )}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={clsx(
              'h-8 rounded-sm bg-orange px-4 text-center text-sm capitalize text-white hover:bg-orange/80',
              {
                'bg-orange text-white hover:bg-orange/80': isActiceSortBy(sortBy.sold),
                'bg-white bg-slate-100 text-black': !isActiceSortBy(sortBy.sold)
              }
            )}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={clsx('h-8 px-4 text-left capitalize text-black hover:bg-slate-100', {
              'bg-orange text-white hover:bg-orange/80': isActiceSortBy(sortBy.price),
              'bg-white bg-slate-100 ': !isActiceSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <button className='h-8 cursor-not-allowed rounded-tr-sm rounded-br-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <ArrowLeftIcon className='h-3 w-3' />
              </button>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
              >
                <button className='h-8 cursor-pointer rounded-tr-sm rounded-br-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                  <ArrowLeftIcon className='h-3 w-3' />
                </button>
              </Link>
            )}
            {page === pageSize ? (
              <button className='h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                <ArrowRightIcon className='h-3 w-3' />
              </button>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
              >
                <button className='h-8 cursor-pointer rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                  <ArrowRightIcon className='h-3 w-3' />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
