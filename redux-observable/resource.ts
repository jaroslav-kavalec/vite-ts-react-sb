import { AxiosInstance } from 'axios';
import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import ApiAjax from 'store/ajax';
import reducers from 'store/reducers';

export type RootState = ReturnType<ReturnType<typeof reducers>>;

export type ReducersSlice = Partial<RootState>;

export type BaseEpic = Epic<AnyAction, AnyAction, RootState, { ajax: ApiAjax; axios: AxiosInstance }>;

export enum ResourceStateEnum {
  Loading = 'Loading',
  Success = 'Success',
  Failure = 'Failure',
  Updating = 'Updating',
  UpdateFailure = 'UpdateFailure',
}

export type Resource<T, E extends any = any> =
  | {
      state: ResourceStateEnum.Loading;
    }
  | {
      state: ResourceStateEnum.Success;
      data: T;
    }
  | {
      state: ResourceStateEnum.Updating;
      data: T;
    }
  | {
      state: ResourceStateEnum.Failure;
      error?: E;
    }
  | {
      state: ResourceStateEnum.UpdateFailure;
      data: T;
      error?: E;
    };

function hasData<T, E>(
  resource: Resource<T, E>,
): resource is
  | { state: ResourceStateEnum.Success; data: T }
  | { state: ResourceStateEnum.Updating; data: T }
  | { state: ResourceStateEnum.UpdateFailure; data: T; error: E } {
  if (
    resource.state === ResourceStateEnum.Success ||
    resource.state === ResourceStateEnum.Updating ||
    resource.state === ResourceStateEnum.UpdateFailure
  )
    return true;
  return false;
}
