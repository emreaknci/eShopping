﻿using CatalogService.API.Context;
using CatalogService.API.Dtos.ForFeature;
using CatalogService.API.Models;
using CatalogService.API.Utils.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CatalogService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeatureController : ControllerBase
    {
        private readonly CatalogDbContext _catalogContext;

        public FeatureController(CatalogDbContext catalogContext)
        {
            _catalogContext = catalogContext;
        }

        [HttpPost("add-feature")]
        public async Task<IActionResult> CreateFeature([FromBody] FeatureCreateDto dto)
        {
            var feature = new Feature
            {
                Name = dto.Name,
            };
            feature = _catalogContext.Features.Add(feature).Entity;
            var saved = await _catalogContext.SaveChangesAsync();
            if (saved == 0)
                return BadRequest(Result<List<FeatureListDto>>.FailureResult("Özellik eklenirken bir hata oluştu"));


            _catalogContext.FeatureValues.AddRange(
                dto.Values
                .Select(value => new FeatureValue { Value = value, FeatureId = feature.Id })
                );
            saved = await _catalogContext.SaveChangesAsync();

            if (saved == 0)
                return BadRequest(Result<List<FeatureListDto>>.FailureResult("Özellik değerleri eklenirken bir hata oluştu"));

            var featureListDtos = _catalogContext.Features
                .Include(f => f.FeatureValues)
                .Where(f => f.Id == feature.Id)
                .Select(f => new FeatureListDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    Values = f.FeatureValues
                        .Select(v => new FeatureValueListDto
                        {
                            Id = v.Id,
                            Value = v.Value
                        })
                        .ToList()
                })
                .ToList();

            return Ok(Result<List<FeatureListDto>>.SuccessResult(featureListDtos));
        }

        [HttpPost("add-feature-value")]
        public IActionResult CreateFeatureValue([FromBody] FeatureValueCreateDto dto)
        {
            var featureValue = new FeatureValue
            {
                Value = dto.Value,
                FeatureId = dto.FeatureId
            };
            featureValue = _catalogContext.FeatureValues.Add(featureValue).Entity;
            _catalogContext.SaveChanges();

            return Ok(Result<FeatureValue>.SuccessResult(featureValue));

        }

        [HttpPut("update-feature")]
        public IActionResult UpdateFeature([FromBody] FeatureUpdateDto dto)
        {
            var feature = _catalogContext.Features.SingleOrDefault(x => x.Id == dto.Id);
            if (feature == null)
            {
                return NotFound(Result<Feature>.FailureResult("Özellik bulunamadı"));
            }

            foreach (var newValue in dto.NewValues)
            {
                _catalogContext.FeatureValues.Add(new() { Value = newValue, FeatureId = dto.Id });
            }


            var result = _catalogContext.SaveChanges();

            return result == 0
                ? BadRequest(Result<bool>.FailureResult("Özellik güncellenirken bir hata oluştu"))
                : Ok(Result<bool>.SuccessResult(true));
        }

        [HttpDelete("delete-feature")]
        public IActionResult DeleteFeature(int id)
        {
            var feature = _catalogContext.Features.SingleOrDefault(x => x.Id == id);
            if (feature == null)
            {
                return NotFound(Result<Feature>.FailureResult("Özellik bulunamadı"));
            }
            feature.IsDeleted = true;
            _catalogContext.SaveChanges();
            return Ok(Result<Feature>.SuccessResult(feature));

        }

        [HttpDelete("delete-feature-value")]
        public IActionResult DeleteFeatureValue(int id)
        {
            var featureValue = _catalogContext.FeatureValues.SingleOrDefault(x => x.Id == id);
            if (featureValue == null)
            {
                return NotFound(Result<FeatureValue>.FailureResult("Özellik bulunamadı"));
            }
            featureValue.IsDeleted = true;
            _catalogContext.SaveChanges();
            return Ok(Result<FeatureValue>.SuccessResult(featureValue));
        }

        [HttpGet]
        public IActionResult GetFeatures()
        {
            List<FeatureListDto> dtos = _catalogContext.Features
                .Include(f => f.FeatureValues)
                .Where(f => !f.IsDeleted)
                .Select(f => new FeatureListDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    Values = f.FeatureValues
                        .Where(v => !v.IsDeleted)
                        .Select(v => new FeatureValueListDto
                        {
                            Id = v.Id,
                            Value = v.Value
                        })
                        .ToList()
                })
                .ToList();

            if (dtos.Count == 0 || dtos == null)
            {
                return NotFound(Result<List<FeatureListDto>>.FailureResult("Özellik bulunamadı"));
            }

            return Ok(Result<List<FeatureListDto>>.SuccessResult(dtos));
        }

        [HttpGet("get-by-ids")]
        public IActionResult GetFeaturesByIds([FromHeader] List<int> ids)
        {
            List<FeatureListDto> dtos = _catalogContext.Features
                .Include(f => f.FeatureValues)
                .Where(f => ids.Contains(f.Id) && !f.IsDeleted)
                .Select(f => new FeatureListDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    Values = f.FeatureValues
                        .Where(v => !v.IsDeleted)
                        .Select(v => new FeatureValueListDto
                        {
                            Id = v.Id,
                            Value = v.Value
                        })
                        .ToList()
                })
                .ToList();

            if (dtos.Count == 0 || dtos == null)
            {
                return NotFound(Result<List<FeatureListDto>>.FailureResult("Özellik bulunamadı"));
            }

            return Ok(Result<List<FeatureListDto>>.SuccessResult(dtos));
        }

    }
}
